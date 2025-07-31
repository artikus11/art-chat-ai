<?php

namespace Art\ChatAi\Admin;

use Art\ChatAi\Main;

class Settings {

	protected ?Main $main;


	private static array $schema = [];


	private static array $defaults = [];


	protected string $option_name;


	protected string $option_group;


	public function __construct( Main $main ) {

		$this->main         = $main;
		$this->option_name  = $this->main->get_utils()->get_plugin_prefix() . '_settings';
		$this->option_group = $this->main->get_utils()->get_plugin_prefix() . '_general_settings';
	}


	public function init_hooks(): void {

		add_action( 'admin_menu', [ $this, 'register_menu_page' ] );
		add_action( 'rest_api_init', [ $this, 'register_settings' ] );
	}


	public function register_menu_page(): void {

		add_options_page(
			'ChatBot Настройки',
			'ChatBot',
			'manage_options',
			$this->main->get_utils()->get_plugin_prefix() . '-settings',
			[ $this, 'render_page' ]
		);
	}


	function render_page(): void {

		load_template(
			$this->main->get_templater()->get_template( 'admin/settings-page.php' ),
			true,
			[]
		);
	}


	/**
	 * Получить схему настроек для REST API.
	 *
	 * Схема описывает структуру данных, валидацию и дефолты.
	 * Используется в register_setting() для show_in_rest.
	 *
	 * @return array {
	 * @type string $type       Тип: 'object'
	 * @type array  $properties Поля настроек
	 *                          }
	 * @since 1.0.0
	 */
	public static function get_schema(): array {

		if ( empty( self::$schema ) ) {
			self::$schema = [
				'type'       => 'object',
				'properties' => [
					'apiKey'       => [
						'type'        => 'string',
						'default'     => '123',
						'description' => 'API-ключ для авторизации в чате Varman',
					],
					'extraRules'   => [
						'type'        => 'string',
						'default'     => '1111111111111111',
						'description' => 'Дополнительные правила поведения чата (текст)',
					],
					'chatPosition' => [
						'type'        => 'string',
						'default'     => 'right',
						'enum'        => [ 'left', 'right' ],
						'description' => 'Расположение окна чата на экране',
					],
					'chatColor'    => [
						'type'        => 'string',
						'default'     => '#007cba',
						'pattern'     => '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
						'description' => 'Цвет чата в формате HEX',
					],
					'showAvatar'   => [
						'type'        => 'boolean',
						'default'     => true,
						'description' => 'Показывать аватар в чате',
					],
				],
			];
		}

		return self::$schema;
	}


	/**
	 * Получить ассоциативный массив дефолтных значений.
	 *
	 * Дефолты извлекаются из схемы, чтобы не дублировать данные.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public static function get_defaults(): array {

		if ( empty( self::$defaults ) ) {
			$schema         = self::get_schema();
			self::$defaults = [];
			foreach ( $schema['properties'] as $key => $prop ) {
				self::$defaults[ $key ] = $prop['default'];
			}
		}

		return self::$defaults;
	}


	/**
	 * Зарегистрировать настройки в WordPress и REST API.
	 *
	 * @return void
	 * @since 1.0.0
	 * @hook  rest_api_init
	 */
	public function register_settings(): void {

		register_setting(
			$this->option_group,
			$this->option_name,
			[
				'type'              => 'object',
				'description'       => 'Настройки интеграции с Varman Chat',
				'sanitize_callback' => [ $this, 'sanitize_settings' ],
				'show_in_rest'      => [
					'schema' => self::get_schema(),
				],
			]
		);
	}


	/**
	 * Санитизация входящих данных перед сохранением.
	 *
	 * @param  mixed $input Входные данные (ожидается массив)
	 *
	 * @return array Санитизированные настройки
	 * @since 1.0.0
	 */
	public function sanitize_settings( $input ): array {

		$sanitized = [];
		$defaults  = self::get_defaults();

		foreach ( $defaults as $key => $default ) {
			if ( ! isset( $input[ $key ] ) ) {
				$sanitized[ $key ] = $default;
				continue;
			}

			$value = $input[ $key ];

			switch ( $key ) {
				case 'apiKey':
				case 'extraRules':
					$sanitized[ $key ] = sanitize_text_field( $value );
					break;

				case 'chatPosition':
					$sanitized[ $key ] = in_array( $value, [ 'left', 'right' ], true ) ? $value : $default;
					break;

				case 'chatColor':
					// Проверяем формат HEX: #RGB или #RRGGBB
					$hex_pattern       = '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/';
					$sanitized[ $key ] = preg_match( $hex_pattern, $value ) ? $value : $default;
					break;

				case 'showAvatar':
					$sanitized[ $key ] = rest_sanitize_value_from_schema( $value, [ 'type' => 'boolean' ], $key );
					break;

				default:
					$sanitized[ $key ] = $default;
			}
		}

		return $sanitized;
	}


	/**
	 * Получить текущие настройки с применением дефолтов.
	 *
	 * @return array Ассоциативный массив настроек
	 * @since 1.0.0
	 */
	public function get() {

		$saved = get_option( $this->option_name, [] );

		return wp_parse_args( $saved, self::get_defaults() );
	}


	/**
	 * Сохранить настройки (опционально, обычно через REST API).
	 *
	 * @param  array $data Данные для сохранения
	 *
	 * @return bool Успешно ли сохранено
	 * @since 1.0.0
	 */
	public function save( $data ) {

		return update_option( $this->option_name, $data );
	}


	/**
	 * @return string
	 */
	public function get_option_name(): string {

		return $this->option_name;
	}
}
