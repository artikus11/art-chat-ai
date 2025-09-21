<?php

namespace Art\ChatAi;

use Art\ChatAi\Admin\Settings;
use Art\ChatAi\Frontend\View;
use Art\ChatAi\Helpers\Templater;
use Art\ChatAi\Helpers\Utils;
use Art\ChatAi\Traits\SingletonTrait;

class Main {

	use SingletonTrait;

	protected Utils $utils;


	protected Templater $templater;


	protected Settings $settings;


	protected function __construct() {

		$this->init_classes();
		$this->init_hooks();
	}


	public function init_classes(): void {

		$this->utils     = new Utils();
		$this->templater = new Templater();
		$this->settings  = new Settings( $this );
		$this->settings->init_hooks();

		( new Enqueue( $this ) )->init_hooks();

		( new View( $this ) )->init_hooks();
	}


	public function init_hooks(): void {

		add_action( 'before_woocommerce_init', static function () {

			if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
				\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility(
					'custom_order_tables',
					Utils::get_plugin_basename(),
					true
				);
			}
		} );
	}


	public function get_templater(): Templater {

		return $this->templater;
	}


	public function get_utils(): Utils {

		return $this->utils;
	}


	/**
	 * Получить настройки
	 *
	 * @return \Art\ChatAi\Admin\Settings
	 */
	public function get_settings(): Settings {

		return $this->settings;
	}
}