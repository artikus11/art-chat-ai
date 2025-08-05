<?php

namespace Art\ChatAi\Rest\Admin;

use Art\ChatAi\Rest\Admin\Operations\Additionals;
use Art\ChatAi\Rest\Admin\Operations\Ping;
use Art\ChatAi\Rest\Admin\Operations\Sync;
use Art\ChatAi\Rest\Bootstrapper;
use Art\ChatAi\Rest\Router;

class Bootstrap extends Bootstrapper {

	public function register_routes(): void {

		$router = new Router();

		$router->register(
			'sync',
			Sync::class,
			[ 'POST' ],
			'manage_options'
		);

		$router->register(
			'ping',
			Ping::class,
			[ 'GET' ]
		);

		$router->register(
			'all-additionals',
			Additionals::class,
			[ 'GET' ]
		);
	}
}