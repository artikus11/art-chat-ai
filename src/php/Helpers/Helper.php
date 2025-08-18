<?php

namespace Art\ChatAi\Helpers;

class Helper {

	public static function get_option( $name ) {

		$option = self::get_options();

		return $option[ $name ] ?? '';
	}


	public static function get_options() {

		return get_option( Utils::get_plugin_prefix() . '_settings' );
	}
}
