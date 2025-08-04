<?php

namespace Art\ChatAi\Api;

use Exception;
use InvalidArgumentException;

class Client {

	protected ?string $api_key;


	private string $base_url;


	private int $timeout;


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
	 * Добавляет дополнительные данные
	 *
	 * @param  array  $lines     Массив строк для добавления
	 * @param  string $file_name Имя файла
	 *
	 * @return array Результат запроса
	 */
	public function add_additional( array $lines, string $file_name ): array {

		return $this->post( '/embeddings/additional', [
			'file_name'  => $file_name,
			'file_texts' => $lines,
		] );
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

		return $this->put( '/embeddings/additional', [
			'file_name'  => $file_name,
			'file_texts' => $lines,
		] );
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
				'message' => $response->get_error_message(),
			];
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = trim( wp_remote_retrieve_body( $response ) );

		if ( $code >= 200 && $code < 300 ) {
			$json = json_decode( $body, true );

			return [
				'success' => true,
				'data'    => $json ?? $body,
				'status'  => $code,
			];
		}

		return [
			'success' => false,
			'message' => "Ошибка $code: " . ( $body ? : 'Пустой ответ' ),
			'status'  => $code,
		];
	}
}