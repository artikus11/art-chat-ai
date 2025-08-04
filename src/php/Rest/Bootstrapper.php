<?php

namespace Art\ChatAi\Rest;

abstract class Bootstrapper {

	public function init_hooks(): void {

		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}


	abstract public function register_routes();
}