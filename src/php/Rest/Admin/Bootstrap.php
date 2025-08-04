<?php

namespace Art\ChatAi\Rest\Admin;

use Art\ChatAi\Rest\Bootstrapper;
use Art\ChatAi\Rest\Router;

class Bootstrap extends Bootstrapper {

	public function register_routes(): void {

		$router = new Router();

		$router->register(
			'sync',
			SyncOperation::class,
			'manage_options'
		);

		$router->register(
			'ping',
			PingOperation::class
		);
	}
}