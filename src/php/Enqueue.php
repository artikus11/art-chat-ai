<?php

namespace Art\ChatAi;

use Art\ChatAi\Admin\Settings;
use Art\ChatAi\Helpers\AssetHandle;
use Art\ChatAi\Helpers\Helper;

class Enqueue {

	protected ?Main $main;


	protected string $prefix;


	protected string $version;


	protected string $assets_url;


	protected string $assets_path;


	protected string $suffix;


	protected AssetHandle $asset_handle;


	protected array $asset_data_cache = [];


	protected array $asset_data;


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


	public function init_hooks(): void {

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_assets' ], 100 );
		add_action( 'wp_enqueue_scripts', [ $this, 'public_assets' ], 100 );
	}


	public function public_assets(): void {

		$this->public_style();
		$this->public_scripts();
	}


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


	protected function generate_css( string $handle ): void {

		$accent_chat_color = Helper::get_option_appearance( 'accent_chat_color' );

		if ( empty( $accent_chat_color ) ) {
			return;
		}

		$css = sprintf(
			':root { --acai-accent-color: %s; }',
			sanitize_hex_color( $accent_chat_color )
		);

		wp_add_inline_style( $handle, $css );
	}


	public function public_scripts(): void {

		$handle = $this->asset_handle->get_handle( 'public_script' );

		wp_register_script(
			$handle,
			$this->get_asset_url( 'js/public-script.js' ),
			[ 'jquery' ],
			$this->version,
			[
				'in_footer' => true,
				'strategy'  => 'defer',
			]
		);

		wp_localize_script(
			$handle,
			$this->asset_handle->get_object_name( 'public_settings' ),
			[
				'api'      => [
					'url'    => Helper::get_option_api( 'url' ),
					'domain' => Helper::get_option_api( 'domain' ),
					'debug'  => Helper::get_option_api( 'debug' ),
				],
				'messages' => [
					'greeting' => [
						'text'  => Helper::get_option_messages( 'greeting_text' ),
						'delay' => Helper::get_option_messages( 'greeting_delay' ),
					],
					'followup' => [
						'text'  => Helper::get_option_messages( 'followup_text' ),
						'delay' => Helper::get_option_messages( 'followup_delay' ),
					],
					'fallback' => [
						'text'  => Helper::get_option_messages( 'fallback_text' ),
						'delay' => Helper::get_option_messages( 'fallback_delay' ),
					],
					'error'    => [
						'text'  => Helper::get_option_messages( 'error_text' ),
						'delay' => Helper::get_option_messages( 'error_delay' ),
					],

				],
			]
		);
	}


	public function admin_assets( string $hook_suffix ): void {

		if ( $hook_suffix !== "settings_page_$this->prefix-settings" ) {
			return;
		}

		$this->enqueue_admin_scripts();
		$this->enqueue_admin_styles();
	}


	public function enqueue_admin_scripts(): void {

		$handle = $this->asset_handle->get_handle( 'settings_script' );

		wp_enqueue_script(
			$handle,
			$this->get_asset_url( 'js/settings.js' ),
			$this->asset_data['dependencies'] ?? [],
			$this->asset_data['version'] ?? $this->version,
			true
		);

		$settings_instance = new Settings( $this->main );

		wp_localize_script(
			$handle,
			$this->asset_handle->get_object_name( 'admin_settings' ),
			[
				'defaults'    => $settings_instance->get_defaults(),
				'current'     => $settings_instance->get(),
				'option_name' => $settings_instance->get_option_name(),
				'version'     => $this->version,
				'rest'        => [
					'root'  => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				],
			]
		);
	}


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


	protected function get_cached_asset_data( string $asset_file ): array {

		if ( ! isset( $this->asset_data_cache[ $asset_file ] ) ) {
			$this->asset_data_cache[ $asset_file ] = $this->get_asset_data( $asset_file );
		}

		return $this->asset_data_cache[ $asset_file ];
	}


	protected function get_asset_data( string $asset_file ): array {

		$file_path = $this->assets_path . '/' . $asset_file;

		return file_exists( $file_path ) ? include $file_path : [];
	}
}
