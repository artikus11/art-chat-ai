<?php

namespace Art\ChatAi;

use Art\ChatAi\Admin\Settings;
use Art\ChatAi\Helpers\AssetHandle;

/**
 * Класс Enqueue отвечает за регистрацию и загрузку скриптов и стилей WordPress-плагина.
 *
 * Управляет загрузкой ресурсов как на фронтенде, так и в админке.
 * Использует WP_API для корректной интеграции с WordPress.
 */
class Enqueue {

	/**
	 * Экземпляр основного класса плагина.
	 *
	 * @var Main|null
	 */
	protected ?Main $main;


	/**
	 * Префикс плагина, используется для уникальности хендлов и объектов JS/PHP.
	 *
	 * @var string
	 */
	protected string $prefix;


	/**
	 * Версия плагина, используется для кэширования ассетов.
	 *
	 * @var string
	 */
	protected string $version;


	/**
	 * URL директории с ассетами плагина.
	 *
	 * @var string
	 */
	protected string $assets_url;


	/**
	 * Путь до директории с ассетами плагина.
	 *
	 * @var string
	 */
	protected string $assets_path;


	/**
	 * Суффикс для минифицированных файлов (`.min` или пустая строка).
	 *
	 * @var string
	 */
	protected string $suffix;


	/**
	 * Объект для генерации уникальных хендлов и имен объектов JS.
	 *
	 * @var AssetHandle
	 */
	protected AssetHandle $asset_handle;


	/**
	 * Кэш данных из asset.php файлов.
	 *
	 * @var array
	 */
	protected array $asset_data_cache = [];


	/**
	 * Данные из файла `js/settings.min.asset.php`.
	 *
	 * @var array
	 */
	protected array $asset_data;


	/**
	 * Конструктор класса Enqueue.
	 *
	 * Инициализирует основные параметры: префикс, версию, пути и суффиксы.
	 *
	 * @param  Main $main Экземпляр основного класса плагина.
	 */
	public function __construct( Main $main ) {

		$this->main = $main;

		$utils = $this->main->get_utils();

		$this->prefix      = $utils->get_plugin_prefix();
		$this->version     = $utils->get_plugin_version();
		$this->assets_url  = $utils->get_plugin_url() . '/assets';
		$this->assets_path = $utils->get_plugin_path() . '/assets';
		$this->suffix      = $utils->get_minified_suffix();

		$this->asset_handle = new AssetHandle( $this->prefix );

		$this->asset_data = $this->get_cached_asset_data( 'js/settings.min.asset.php' );
	}


	/**
	 * Регистрирует хуки для загрузки скриптов и стилей.
	 *
	 * Хуки:
	 * - admin_enqueue_scripts — для админки
	 * - wp_enqueue_scripts    — для фронтенда
	 */
	public function init_hooks(): void {

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_assets' ], 100 );
		add_action( 'wp_enqueue_scripts', [ $this, 'public_assets' ], 100 );
	}


	/**
	 * Загружает стили и скрипты для фронтенда.
	 */
	public function public_assets(): void {

		$this->public_style();
		$this->public_scripts();
	}


	/**
	 * Регистрирует и загружает стили для фронтенда.
	 */
	public function public_style(): void {

		$handle = $this->asset_handle->get_handle( 'public_style' );

		wp_register_style(
			$handle,
			$this->get_asset_url( 'css/public-style.css' ),
			[],
			$this->version
		);

		$this->generate_css( $handle );
	}


	/**
	 * Генерирует CSS-переменные и добавляет их inline.
	 *
	 * Используется для темизации элементов чата.
	 *
	 * @param  string $handle Хендл зарегистрированного стиля.
	 */
	protected function generate_css( string $handle ): void {

		$accent_chat_color = $this->get_option( 'appearance', 'accent_chat_color' );

		if ( empty( $accent_chat_color ) ) {
			return;
		}

		$css = sprintf(
			':root { --acai-accent-color: %s; }',
			sanitize_hex_color( $accent_chat_color )
		);

		wp_add_inline_style( $handle, $css );
	}


	/**
	 * Регистрирует и загружает скрипты для фронтенда.
	 *
	 * Также передаёт настройки плагина в JS через wp_localize_script.
	 */
	public function public_scripts(): void {

		$handle = $this->asset_handle->get_handle( 'public_script' );

		wp_register_script(
			$handle,
			$this->get_asset_url( 'js/public-script.js' ),
			[ 'jquery' ],
			$this->version,
			[
				'in_footer' => false,
				//'strategy'  => 'defer',
			]
		);

		wp_localize_script(
			$handle,
			$this->asset_handle->get_object_name( 'public_settings' ),
			[
				'api'      => [
					'url'    => $this->get_option( 'api', 'url' ),
					'domain' => $this->get_option( 'api', 'domain' ),
				],
				'general'  => $this->get_settings_general(),
				'messages' => $this->get_settings_messages(),
			]
		);
	}


	/**
	 * Загружает стили и скрипты для админки только на странице настроек.
	 *
	 * @param  string $hook_suffix Идентификатор текущей страницы админки.
	 */
	public function admin_assets( string $hook_suffix ): void {

		if ( $hook_suffix !== "settings_page_$this->prefix-settings" ) {
			return;
		}

		$this->enqueue_admin_scripts();
		$this->enqueue_admin_styles();
	}


	/**
	 * Загружает скрипты для страницы настроек в админке.
	 */
	public function enqueue_admin_scripts(): void {

		$handle = $this->asset_handle->get_handle( 'settings_script' );

		wp_enqueue_script(
			$handle,
			$this->get_asset_url( 'js/settings.js' ),
			$this->asset_data['dependencies'] ?? [],
			$this->asset_data['version'] ?? $this->version,
			true
		);

		wp_localize_script(
			$handle,
			$this->asset_handle->get_object_name( 'admin_settings' ),
			[
				'defaults'    => $this->get_settings()->get_defaults(),
				'current'     => $this->get_settings()->get(),
				'option_name' => $this->get_settings()->get_option_name(),
				'version'     => $this->version,
				'rest'        => [
					'root'  => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				],
			]
		);
	}


	/**
	 * Загружает стили для страницы настроек в админке.
	 */
	protected function enqueue_admin_styles(): void {

		$handle = $this->asset_handle->get_handle( 'settings_style' );

		wp_enqueue_style( 'wp-components' );

		wp_enqueue_style(
			$handle,
			$this->get_asset_url( 'css/settings-style.css' ),
			[],
			$this->asset_data['version'] ?? $this->version
		);
	}


	/**
	 * Возвращает URL к указанному ассету с учётом суффикса и версии.
	 *
	 * @param  string $relative_path Относительный путь к файлу ассета.
	 *
	 * @return string Полный URL к файлу ассета.
	 */
	protected function get_asset_url( string $relative_path ): string {

		$directory = dirname( $relative_path );
		$filename  = pathinfo( $relative_path, PATHINFO_FILENAME );
		$extension = pathinfo( $relative_path, PATHINFO_EXTENSION );

		$base_url = ( $directory !== '.' )
			? rtrim( $this->assets_url, '/' ) . '/' . trim( $directory, '/' )
			: $this->assets_url;

		return sprintf(
			'%s/%s%s.%s',
			$base_url,
			$filename,
			$this->suffix,
			$extension
		);
	}


	/**
	 * Получает данные из файла asset.php с кэшированием.
	 *
	 * @param  string $asset_file Путь к файлу asset.php.
	 *
	 * @return array Данные из файла или пустой массив.
	 */
	protected function get_cached_asset_data( string $asset_file ): array {

		if ( ! isset( $this->asset_data_cache[ $asset_file ] ) ) {
			$this->asset_data_cache[ $asset_file ] = $this->get_asset_data( $asset_file );
		}

		return $this->asset_data_cache[ $asset_file ];
	}


	/**
	 * Получает данные из файла asset.php.
	 *
	 * @param  string $asset_file Путь к файлу asset.php.
	 *
	 * @return array Данные из файла или пустой массив.
	 */
	protected function get_asset_data( string $asset_file ): array {

		$file_path = $this->assets_path . '/' . $asset_file;

		return file_exists( $file_path ) ? include $file_path : [];
	}


	/**
	 * Получает экземпляр класса настроек.
	 *
	 * @return \Art\ChatAi\Admin\Settings
	 */
	protected function get_settings(): Settings {

		return $this->main->get_settings();
	}


	/**
	 * Получает настройки сообщений.
	 *
	 * @return array
	 */
	protected function get_settings_messages(): array {

		return $this->get_settings()->get_option_group( 'messages' );
	}


	/**
	 * Получает основные настройки.
	 *
	 * @return array
	 */
	protected function get_settings_general(): array {

		return $this->get_settings()->get_option_group( 'general' );
	}


	/**
	 * Получает настройки API.
	 *
	 * @return array
	 */
	protected function get_settings_api(): array {

		return $this->get_settings()->get_option_group( 'api' );
	}


	protected function get_option( string $group, string $key ) {

		return $this->get_settings()->get_option( $group, $key );
	}
}