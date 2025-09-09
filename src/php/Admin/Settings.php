<?php

namespace Art\ChatAi\Admin;

use Art\ChatAi\Main;
use Art\ChatAi\Rest\Admin\Bootstrap as AdminBoostrapRest;

class Settings {

	protected ?Main $main;


	protected string $option_name;


	protected string $option_group;


	protected string $prefix;


	/**
	 * @var \Art\ChatAi\Admin\SettingsSchema
	 */
	protected SettingsSchema $settings_schema;


	/**
	 * @var \Art\ChatAi\Admin\SettingsSanitizer
	 */
	protected SettingsSanitizer $settings_sanitizer;


	public function __construct( Main $main ) {

		$this->main = $main;

		$this->prefix = $this->main->get_utils()->get_plugin_prefix();

		$this->option_name  = "{$this->prefix}_settings";
		$this->option_group = "{$this->prefix}_general_settings";

		$this->settings_schema    = new SettingsSchema();
		$this->settings_sanitizer = new SettingsSanitizer();
	}


	public function init_hooks(): void {

		add_action( 'admin_menu', [ $this, 'register_menu_page' ] );
		add_action( 'rest_api_init', [ $this, 'register_settings' ] );

		( new AdminBoostrapRest() )->init_hooks();
	}


	public function register_menu_page(): void {

		add_options_page(
			'ChatBot Настройки',
			'ChatBot',
			'manage_options',
			"$this->prefix-settings",
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
					'schema' => $this->get_schema(),
				],
			]
		);
	}


	public function get_schema(): array {

		return $this->settings_schema->get_rest_schema();
	}


	public function get_defaults(): array {

		return $this->settings_schema->get_defaults();
	}


	/**
	 * Санитизация входящих данных перед сохранением.
	 *
	 * @param  array $input Входные данные (ожидается массив)
	 *
	 * @return array Санитизированные настройки
	 * @since 1.0.0
	 */
	public function sanitize_settings( array $input ): array {

		return $this->settings_sanitizer->sanitize(
			$input,
			$this->get_schema(),
			$this->get_defaults()
		);
	}


	/**
	 * Получить текущие настройки с применением дефолтов.
	 *
	 * @return array Ассоциативный массив настроек
	 * @since 1.0.0
	 */
	public function get(): array {

		$saved = get_option( $this->option_name, [] );

		return wp_parse_args( $saved, $this->get_defaults() );
	}


	/**
	 * Сохранить настройки (опционально, обычно через REST API).
	 *
	 * @param  array $data Данные для сохранения
	 *
	 * @return bool Успешно ли сохранено
	 * @since 1.0.0
	 */
	public function save( array $data ): bool {

		return update_option( $this->option_name, $data );
	}


	/**
	 * @return string
	 */
	public function get_option_name(): string {

		return $this->option_name;
	}

}
