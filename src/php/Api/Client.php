<?php

namespace Art\ChatAi\Api;

use Exception;
use InvalidArgumentException;

class Client {

	protected ?string $api_key;


	private string $base_url;


	private int $timeout;


	private ?array $cached_additional_files = null;


	/**
	 * @param  string $base_url Базовый URL API (по умолчанию 'https://chat.varman.pro')
	 * @param  int    $timeout  Таймаут запросов в секундах (по умолчанию 60)
	 *
	 * @throws Exception Если URL невалидный
	 */
	public function __construct( ?string $api_key = null, string $base_url = 'https://chat.varman.pro', int $timeout = 60 ) {

		if ( ! filter_var( $base_url, FILTER_VALIDATE_URL ) ) {
			throw new Exception( 'Неверный базовый URL API' );
		}

		$this->base_url = rtrim( $base_url, '/' );
		$this->timeout  = max( 1, $timeout );
		$this->api_key  = $api_key;

		// Проверяем, если ключ передан, но пустой
		if ( $api_key !== null && trim( $api_key ) === '' ) {
			throw new InvalidArgumentException( 'API-ключ не может быть пустым' );
		}
	}


	/**
	 * Устанавливает новый таймаут для запросов
	 *
	 * @param  int $timeout Таймаут в секундах
	 */
	public function set_timeout( int $timeout ): void {

		$this->timeout = max( 1, $timeout );
	}


	/**
	 * Отправляет сообщение в чат с поддержкой stream
	 *
	 * @param  string        $message  Сообщение для отправки
	 * @param  string|null   $id_chat  ID чата (опционально)
	 * @param  callable|null $on_chunk Колбэк для обработки чанков данных
	 *
	 * @return array Результат запроса
	 * @throws Exception
	 */
	public function chat_stream( string $message, ?string $id_chat = null, ?callable $on_chunk = null ): array {

		$url  = $this->base_url . '/api/chat';
		$body = wp_json_encode( [
			'message' => $message,
			'idChat'  => $id_chat,
		] );

		$context = stream_context_create( [
			'http' => [
				'method'  => 'POST',
				'header'  => $this->get_headers( [ 'Content-Type: application/json', 'Accept: text/event-stream' ] ),
				'content' => $body,
				'timeout' => $this->timeout,
			],
		] );

		$stream = @fopen( $url, 'r', false, $context );
		if ( ! $stream ) {
			throw new Exception( 'Не удалось подключиться к API чата' );
		}

		$response = '';
		$sources  = [];
		$chat_id  = null;

		try {
			while ( ! feof( $stream ) ) {
				$line = fgets( $stream );
				if ( $line === false ) {
					continue;
				}

				if ( str_starts_with( $line, 'data:' ) ) {
					$data = trim( substr( $line, 5 ) );
					if ( empty( $data ) ) {
						continue;
					}

					if ( str_starts_with( $data, '[' ) ) {
						if ( preg_match( '/\[CHAT_ID-(.+)\]/', $data, $m ) ) {
							$chat_id = $m[1];
							$this->call_callback( $on_chunk, 'chat_id', $chat_id );
						}
						if ( $data === '[DONE]' ) {
							$this->call_callback( $on_chunk, 'done', null );
							break;
						}
					} elseif ( str_starts_with( $data, '\nСсылка на источник:' ) ) {
						$url       = trim( substr( $data, 20 ) );
						$sources[] = $url;
						$this->call_callback( $on_chunk, 'source', $url );
					} else {
						$json = json_decode( $data, true );
						if ( json_last_error() !== JSON_ERROR_NONE ) {
							continue;
						}

						if ( isset( $json['response'] ) ) {
							$response .= $json['response'];
							$this->call_callback( $on_chunk, 'text', $json['response'] );
						}
						if ( ! empty( $json['done'] ) ) {
							$this->call_callback( $on_chunk, 'final', $json );
						}
					}
				}
			}
		} finally {
			fclose( $stream );
		}

		return [
			'success'  => true,
			'response' => $response,
			'sources'  => $sources,
			'chat_id'  => $chat_id,
		];
	}


	/**
	 * Гарантирует существование additional-файла в системе
	 *
	 * @param  string $file_name Имя файла
	 *
	 * @return array ['success' => bool, 'message' => string]
	 */
	public function ensure_additional_file_exists( string $file_name ): array {

		if ( $this->cached_additional_files === null ) {
			$result = $this->get_all_additional();

			if ( ! $result['success'] ) {
				return [
					'success' => false,
					'message' => 'Не удалось получить список additional файлов: ' . $result['message'],
					'data'    => [],
				];
			}

			$files = $result['data'] ?? [];

			if ( ! is_array( $files ) ) {
				return [
					'success' => false,
					'message' => 'Некорректный ответ от API: ожидался массив файлов',
					'data'    => [],
				];
			}

			$this->cached_additional_files = $files;
		}

		if ( in_array( $file_name, $this->cached_additional_files ) ) {
			return [
				'success' => true,
				'message' => "Файл '$file_name' уже существует. Пропускаем создание.",
				'data'    => [
					'action' => 'ensure_skipped',
					'exists' => true,
				],
			];
		}

		$creation_result = $this->post( '/embeddings/additional', [
			'fileName'  => $file_name,
			'fileTexts' => [ '// Правила' ],
		] );

		if ( $creation_result['success'] ) {

			$this->cached_additional_files[] = $file_name;

			return [
				'success' => true,
				'message' => "Файл '$file_name' успешно создан в системе.",
				'data'    => [
					'action' => 'ensure_created',
					'exists' => true,
				],
			];
		}

		return [
			'success' => false,
			'message' => "Не удалось создать файл '$file_name': " . ( $creation_result['message'] ?? 'Неизвестная ошибка' ),
			'data'    => [
				'action' => 'ensure_failed',
				'exists' => false,
			],
		];
	}


	/**
	 * Добавляет дополнительные данные
	 *
	 * @param  array  $lines     Массив строк для добавления
	 * @param  string $file_name Имя файла
	 *
	 * @return array Результат запроса
	 */
	public function add_additional( array $lines, string $file_name ): array {

		$ensure = $this->ensure_additional_file_exists( $file_name );

		if ( ! $ensure['success'] ) {
			return $ensure;
		}

		$response = $this->post( '/embeddings/additional', [
			'fileName'  => $file_name,
			'fileTexts' => $lines,
		] );

		if ( $response['success'] ) {
			return [
				'success' => true,
				'message' => "Дополнительные данные успешно добавлены в файл '$file_name'.",
				'data'    => [
					'action'     => 'added',
					'file_name'  => $file_name,
					'line_count' => count( $lines ),
					'ensure'     => $ensure['data'] ?? [],
				],
			];
		}

		return [
			'success' => false,
			'message' => "Не удалось добавить данные в файл '$file_name': " . $response['message'],
			'data'    => [
				'action'    => 'add_failed',
				'ensure'    => $ensure['data'] ?? [],
				'api_error' => $response['message'],
			],
		];
	}


	/**
	 * Обновляет дополнительные данные
	 *
	 * @param  array  $lines     Массив строк для обновления
	 * @param  string $file_name Имя файла
	 *
	 * @return array Результат запроса
	 */
	public function update_additional( array $lines, string $file_name ): array {

		$response = $this->put( '/embeddings/additional', [
			'fileName'  => $file_name,
			'fileTexts' => $lines,
		] );

		if ( $response['success'] ) {
			return [
				'success' => true,
				'message' => "Дополнительные данные успешно добавлены в файл '$file_name'.",
				'data'    => [
					'action'     => 'update',
					'file_name'  => $file_name,
					'line_count' => count( $lines ),
					'ensure'     => $ensure['data'] ?? [],
				],
			];
		}

		return [
			'success' => false,
			'message' => "Не удалось обновить данные в файле '$file_name': " . $response['message'],
			'data'    => [
				'action'    => 'update_failed',
				'ensure'    => $ensure['data'] ?? [],
				'api_error' => $response['message'],
			],
		];
	}


	/**
	 * Удаляет дополнительные данные
	 *
	 * @param  string $file_name Имя файла для удаления
	 *
	 * @return array Результат запроса
	 */
	public function delete_additional( string $file_name ): array {

		return $this->delete( '/embeddings/additional', [], [
			'file_name' => $file_name,
		] );
	}


	/**
	 * Получает дополнительные данные
	 *
	 * @param  string $file_name Имя файла
	 *
	 * @return array Результат запроса
	 */
	public function get_additional( string $file_name ): array {

		return $this->get( '/embeddings/additional', [
			'file_name' => $file_name,
		] );
	}


	/**
	 * Получает все дополнительные данные
	 *
	 * @return array Результат запроса
	 */
	public function get_all_additional(): array {

		return $this->get( '/embeddings/additionals' );
	}


	public function sync_additional( array $lines, string $file_name, bool $regenerate_all = false ): array {

		$update_result = $this->update_additional( $lines, $file_name );

		if ( ! $update_result['success'] ) {
			return $update_result;
		}

		$regenerate_result = $this->regenerate_embeddings( $regenerate_all );

		if ( ! $regenerate_result['success'] ) {
			return [
				'success' => false,
				'message' => 'Данные обновлены, но не удалось перегенерировать embeddings: ' . $regenerate_result['message'],
				'data'    => [
					'update'     => $update_result['data'],
					'regenerate' => null,
				],
			];
		}

		return [
			'success' => true,
			'message' => 'База знаний обновлена и embeddings перегенерированы.',
			'data'    => [
				'update'     => $update_result['data'],
				'regenerate' => $regenerate_result['data'],
			],
		];
	}


	/**
	 * Получает все дополнительные данные
	 *
	 * @return array Результат запроса
	 */
	public function get_ping(): array {

		return $this->get( '/settings/ping' );
	}


	/**
	 * Регенерирует embeddings
	 *
	 * @param  bool $regenerate_all Флаг полной перегенерации
	 *
	 * @return array Результат запроса
	 */
	public function regenerate_embeddings( bool $regenerate_all = false ): array {

		return $this->post( '/embeddings', [], [
			'regenerate_all' => $regenerate_all ? 'true' : 'false',
		] );
	}


	/**
	 * Синхронизирует продукты
	 *
	 * @param  bool $regenerate_all Флаг полной перегенерации
	 *
	 * @return array Результат запроса
	 */
	public function synchronize_products( bool $regenerate_all = false ): array {

		return $this->get( '/products/synchronize', [
			'regenerate_all' => $regenerate_all ? 'true' : 'false',
		] );
	}


	/**
	 * Возвращает заголовки с X-API-Key, если он установлен
	 *
	 * @param  array $headers Дополнительные заголовки
	 *
	 * @return array Полный список заголовков
	 */
	private function get_headers( array $headers = [] ): array {

		if ( $this->api_key !== null ) {
			$headers['X-API-Key'] = $this->api_key;
		}

		return $headers;
	}


	private function call_callback( ?callable $callback, string $type, $data ): void {

		if ( is_callable( $callback ) ) {
			try {
				$callback( $type, $data );
			} catch ( Exception $e ) {
				error_log( 'Callback error: ' . $e->getMessage() );
			}
		}
	}


	private function post( string $endpoint, array $body, array $query = [] ): array {

		$url  = $this->build_url( $endpoint, $query );
		$args = [
			'headers' => $this->get_headers( [ 'Content-Type' => 'application/json' ] ),
			'body'    => wp_json_encode( $body ),
			'timeout' => $this->timeout,
		];

		$response = wp_remote_post( $url, $args );

		return $this->handle_response( $response );
	}


	private function put( string $endpoint, array $body, array $query = [] ): array {

		$url  = $this->build_url( $endpoint, $query );
		$args = [
			'method'  => 'PUT',
			'headers' => $this->get_headers( [ 'Content-Type' => 'application/json' ] ),
			'body'    => wp_json_encode( $body ),
			'timeout' => $this->timeout,
		];

		$response = wp_remote_request( $url, $args );

		return $this->handle_response( $response );
	}


	private function delete( string $endpoint, array $body = [], array $query = [] ): array {

		$url  = $this->build_url( $endpoint, $query );
		$args = [
			'method'  => 'DELETE',
			'headers' => $this->get_headers( [ 'Content-Type' => 'application/json' ] ),
			'body'    => ! empty( $body ) ? wp_json_encode( $body ) : null,
			'timeout' => $this->timeout,
		];

		$response = wp_remote_request( $url, $args );

		return $this->handle_response( $response );
	}


	private function get( string $endpoint, array $query = [] ): array {

		$url  = $this->build_url( $endpoint, $query );
		$args = [
			'headers' => $this->get_headers(),
			'timeout' => $this->timeout,
		];

		$response = wp_remote_get( $url, $args );

		return $this->handle_response( $response );
	}


	private function build_url( string $endpoint, array $query = [] ): string {

		$url = $this->base_url . '/api' . $endpoint;
		if ( ! empty( $query ) ) {
			$url .= '?' . http_build_query( $query );
		}

		return $url;
	}


	private function handle_response( $response ): array {

		if ( is_wp_error( $response ) ) {
			return [
				'success' => false,
				'message' => 'Сетевая ошибка: ' . $response->get_error_message(),
				'status'  => 500,
			];
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = trim( wp_remote_retrieve_body( $response ) );

		if ( $this->is_success_status( $code ) ) {
			$json = json_decode( $body, true );

			return [
				'success' => true,
				'data'    => $json ?? $body,
				'status'  => $code,
			];
		}


		$error_message = $this->parse_error_message( $body, $code );

		return [
			'success' => false,
			'message' => $error_message,
			'status'  => $code,
		];
	}


	/**
	 * Обрабатывает тело HTTP-ошибки и возвращает человекочитаемое сообщение
	 *
	 * @param  string $body Тело ответа
	 * @param  int    $code HTTP-статус
	 *
	 * @return string
	 */
	private function parse_error_message( string $body, int $code ): string {

		if ( empty( $body ) ) {
			return "Ошибка $code: пустой ответ от сервера";
		}

		$json = json_decode( $body, true );

		if ( json_last_error() === JSON_ERROR_NONE ) {
			if ( ! empty( $json['error'] ) ) {
				$message = $json['error'];
				if ( ! empty( $json['details'] ) ) {
					$message .= ': ' . $json['details'];
				}

				return $message;
			}
			if ( ! empty( $json['message'] ) ) {
				return $json['message'];
			}
		}

		return $body;
	}


	private function is_success_status( int $status ): bool {

		return $status >= 200 && $status < 300;
	}
}