<?php

namespace Art\ChatAi;

use Art\ChatAi\Admin\Settings;
use Art\ChatAi\Frontend\View;
use Art\ChatAi\Helpers\Helper;
use Art\ChatAi\Helpers\Templater;
use Art\ChatAi\Helpers\Utils;
use Art\ChatAi\Traits\SingletonTrait;

class Main {

	use SingletonTrait;

	protected Utils $utils;


	protected Templater $templater;


	protected Helper $helper;


	protected function __construct() {

		$this->init_classes();
		$this->init_hooks();
	}


	public function init_classes(): void {

		$this->utils     = new Utils();
		$this->templater = new Templater();
		$this->helper    = new Helper();

		( new Enqueue( $this ) )->init_hooks();
		( new Settings( $this ) )->init_hooks();
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


	public function get_helper(): Helper {

		return $this->helper;
	}


	public function get_templater(): Templater {

		return $this->templater;
	}


	public function get_utils(): Utils {

		return $this->utils;
	}
}