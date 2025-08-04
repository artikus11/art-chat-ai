<?php

namespace Art\ChatAi\Api;

use WP_REST_Request;
use WP_REST_Response;

abstract class Operation {

	protected WP_REST_Request $request;


	protected ?string $api_key;


	protected Client $client;


	public function __construct( WP_REST_Request $request ) {

		$this->request = $request;
	}


	final public function execute(): WP_REST_Response {

		try {
			$this->validate_request();
			$this->init_client();
			$result = $this->perform_operation();

			return $this->create_success_response( $result );
		} catch ( \Exception $e ) {
			return $this->create_error_response( $e->getMessage() );
		}
	}


	/**
	 * @throws \Exception
	 */
	protected function validate_request(): void {

		$this->api_key = $this->get_api_key();
		if ( empty( $this->api_key ) ) {
			throw new \Exception( 'API-ключ не задан' );
		}
	}


	/**
	 * @throws \Exception
	 */
	protected function init_client(): void {

		$this->client = new Client( $this->api_key );
	}


	protected function get_api_key() {

		$settings = get_option( 'acai_settings', [] );

		return $settings['api_key'] ?? '';
	}


	abstract protected function perform_operation();


	protected function create_success_response( $data ): WP_REST_Response {

		return new WP_REST_Response( $data, 200 );
	}


	protected function create_error_response( $message ): WP_REST_Response {

		return new WP_REST_Response( [
			'success' => false,
			'message' => '❌ ' . $message,
		], 500 );
	}
}