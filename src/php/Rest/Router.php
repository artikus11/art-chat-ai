<?php

namespace Art\ChatAi\Rest;

use Art\ChatAi\Helpers\Utils;
use WP_REST_Request;

class Router {

	public function register( $route, $operation_class, $permission = '__return_true' ): static {

		register_rest_route(
			Utils::get_plugin_prefix() . '/v1',
			"/$route",
			[
				'methods'             => 'POST',
				'callback'            => function ( WP_REST_Request $request ) use ( $operation_class ) {

					$operation = new $operation_class( $request );

					return $operation->execute();
				},
				'permission_callback' => is_callable( $permission ) ? $permission : function () use ( $permission ) {

					return current_user_can( $permission );
				},
			] );

		return $this;
	}
}