<?php

namespace Art\ChatAi;

use Art\ChatAi\Admin\Settings;

class Enqueue {

	protected ?Main $main;


	public function __construct( Main $main ) {

		$this->main = $main;
	}


	public function init_hooks(): void {

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ], 100 );
		add_action( 'wp_enqueue_scripts', [ $this, 'public_scripts' ], 100 );
		add_action( 'wp_enqueue_scripts', [ $this, 'public_style' ], 100 );
	}


	public function public_style(): void {

		wp_register_style(
			$this->get_prefix() . '-public-style',
			sprintf(
				'%s/css/public-style%s.css',
				$this->get_url(),
				$this->get_suffix()
			),
			[],
			$this->get_version(),
		);
	}


	public function public_scripts(): void {

		wp_register_script(
			$this->get_prefix() . '-public-script',
			sprintf(
				'%s/js/public-script%s.js',
				$this->get_url(),
				$this->get_suffix()
			),
			[ 'jquery' ],
			$this->get_version(),
			[
				'in_footer' => true,
				'strategy'  => 'defer',
			]
		);
		/*wp_localize_script(
			'awpo-public-script',
			'awpo_scripts_settings',
			[
				'required_text' => 'Опция обязательна. Пожалуйста выберите нужное значение',
			]
		);*/
	}


	public function admin_scripts( $hook_suffix ): void {


		if ( $hook_suffix !== 'settings_page_' . $this->get_prefix() . '-settings' ) {
			return;
		}

		$asset = include $this->get_path() . '/js/settings.min.asset.php';

		wp_enqueue_script(
			$this->get_prefix() . '-settings-script',
			sprintf(
				'%s/js/settings%s.js',
				$this->get_url(),
				$this->get_suffix()
			),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		$settings_instance = new Settings( $this->main );

		wp_localize_script(
			$this->get_prefix() . '-settings-script',
			'ChatbotSettings',
			[
				'defaults'   => Settings::get_defaults(),
				'current'    => $settings_instance->get(),
				'optionName' => $settings_instance->get_option_name(),
				'version'    => $this->main->get_utils()->get_plugin_version(),
				'rest'       => [
					'root'  => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				],
			]
		);

		wp_enqueue_style( 'wp-components' );

		// Стили (если есть)
		wp_enqueue_style(
			$this->get_prefix() . '-settings-style',
			sprintf(
				'%s/css/settings-style%s.css',
				$this->get_url(),
				$this->get_suffix()
			),
			[],
			$asset['version']
		);
	}


	public function get_version(): string {

		return $this->main->get_utils()->get_plugin_version();
	}


	public function get_url(): string {

		return $this->main->get_utils()->get_plugin_url() . '/assets';
	}


	public function get_path(): string {

		return $this->main->get_utils()->get_plugin_path() . '/assets';
	}


	public function get_suffix(): string {

		return $this->main->get_utils()->get_minified_suffix();
	}


	public function get_prefix(): string {

		return $this->main->get_utils()->get_plugin_prefix();
	}
}
