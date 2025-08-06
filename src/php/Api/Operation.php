<?php

namespace Art\ChatAi\Api;

use WP_REST_Request;
use WP_REST_Response;

abstract class Operation {

	protected WP_REST_Request $request;


	protected ?string $api_key = null;


	protected Client $client;


	public function __construct( WP_REST_Request $request ) {

		$this->request = $request;
	}


	abstract protected function perform_operation();


	final public function execute(): WP_REST_Response {

		try {
			$this->validate_request();
			$this->init_client();
			$result = $this->perform_operation();

			return $this->create_success_response( $result );
		} catch ( \Exception $e ) {
			$status = $e->getCode() >= 400 ? $e->getCode() : 500;

			return $this->create_error_response( $e->getMessage(), $status );
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


	protected function create_success_response( $data ): WP_REST_Response {

		return new WP_REST_Response( $data, 200 );
	}


	protected function create_error_response( $message, int $status = 500 ): WP_REST_Response {

		return new WP_REST_Response( [
			'success' => false,
			'message' => $message,
		], $status );
	}


	/**
	 * @return false|mixed|null
	 */
	protected function get_settings(): mixed {

		return get_option( 'acai_settings', [] );
	}


	protected function get_api_key() {

		$settings = $this->get_settings();

		return $settings['apiKey'] ?? '';
	}


	protected function get_settings_rules(): array {

		$settings = $this->get_settings();
		$rules    = [];

		if ( ! empty( $settings['extraRules'] ) ) {
			$rules = explode( "\n", $settings['extraRules'] );

			$rules = array_filter( $rules, function ( $line ) {

				return trim( $line ) !== '';
			} );

			$rules = array_map( 'trim', $rules );
		}

		return $rules;
	}


	protected function get_file_rules_name(): string {

		return 'varman-rules.add';
	}
}