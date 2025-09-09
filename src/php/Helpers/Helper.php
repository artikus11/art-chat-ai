<?php

namespace Art\ChatAi\Helpers;

class Helper {

	public static function get_option_api( $name ) {

		$option = self::get_options();

		return $option['api'][ $name ] ?? '';
	}


	public static function get_option_messages( $name ) {

		$option = self::get_options();

		return $option['messages'][ $name ] ?? '';
	}


	public static function get_option_appearance( $name ) {

		$option = self::get_options();

		return $option['appearance'][ $name ] ?? '';
	}


	public static function get_option( $group, $name ) {

		$option = self::get_options();

		return $option[ $group ][ $name ] ?? '';
	}


	public static function get_options() {

		return get_option( Utils::get_plugin_prefix() . '_settings' );
	}
}
