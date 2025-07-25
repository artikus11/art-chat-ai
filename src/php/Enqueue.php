<?php

namespace Art\ChatAi;

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

	public  function public_style() {

		wp_enqueue_style(
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

		wp_enqueue_script(
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

		wp_localize_script(
			'awpo-public-script',
			'awpo_scripts_settings',
			[
				'required_text' => 'Опция обязательна. Пожалуйста выберите нужное значение',
			]
		);
	}


	public function admin_scripts(): void {}


	public function get_version(): string {

		return $this->main->get_utils()->get_plugin_version();
	}


	public function get_url(): string {

		return $this->main->get_utils()->get_plugin_url() . '/assets';
	}


	public function get_suffix(): string {

		return $this->main->get_utils()->get_minified_suffix();
	}


	public function get_prefix(): string {

		return $this->main->get_utils()->get_plugin_prefix();
	}
}
