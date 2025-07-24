<?php

namespace Art\ChatAi;

use Art\ChatAi\Helpers\Helper;
use Art\ChatAi\Helpers\Templater;
use Art\ChatAi\Helpers\Utils;
use Art\ChatAi\Traits\SingletonTrait;

class Main {

	use SingletonTrait;

	/**
	 * @var \Art\ChatAi\Utils
	 */
	protected Utils $utils;


	/**
	 * @var \Art\ChatAi\Templater
	 */
	protected Templater $templater;


	/**
	 * @var \Art\ChatAi\Helper
	 */
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


	/**
	 * @return \Art\ChatAi\Helper
	 */
	public function get_helper(): Helper {

		return $this->helper;
	}


	/**
	 * @return \Art\ChatAi\Templater
	 */
	public function get_templater(): Templater {

		return $this->templater;
	}


	/**
	 * @return \Art\ChatAi\Utils
	 */
	public function get_utils(): Utils {

		return $this->utils;
	}
}