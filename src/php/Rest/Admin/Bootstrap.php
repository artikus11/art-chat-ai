<?php

namespace Art\ChatAi\Rest\Admin;

use Art\ChatAi\Rest\Admin\Operations\Additional;
use Art\ChatAi\Rest\Admin\Operations\Additionals;
use Art\ChatAi\Rest\Admin\Operations\ChangeKey;
use Art\ChatAi\Rest\Admin\Operations\Ping;
use Art\ChatAi\Rest\Admin\Operations\Sync;
use Art\ChatAi\Rest\Bootstrapper;
use Art\ChatAi\Rest\Router;

class Bootstrap extends Bootstrapper {

	public function register_routes(): void {

		$router = new Router();

		$router->register(
			'sync-additional',
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

		$router->register(
			'additional',
			Additional::class,
			[ 'GET', 'POST', 'PUT', 'DELETE', ]
		);

		$router->register(
			'change-key',
			ChangeKey::class,
			[ 'POST' ]
		);
	}
}