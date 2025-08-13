<?php

namespace Art\ChatAi\Helpers;

class Helper {

	public static function get_option( $name ) {

		$option = get_option( Utils::get_plugin_prefix() . '_settings' );

		return $option[ $name ];
	}
}
