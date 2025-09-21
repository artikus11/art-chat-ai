<?php

namespace Art\ChatAi\Api;

use Art\ChatAi\Main;
use WP_REST_Request;
use WP_REST_Response;

abstract class Operation {

	protected WP_REST_Request $request;


	protected Client $client;


	protected ?string $api_key = null;


	protected ?string $domain = null;


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
		$this->domain  = $this->get_domain();

		if ( empty( $this->api_key ) ) {
			throw new \Exception( 'API-ключ не задан' );
		}
	}


	/**
	 * @throws \Exception
	 */
	protected function init_client(): void {

		$this->client = new Client( $this->api_key, $this->domain );
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
	protected function get_settings( $group, $name ) {

		$settings = Main::instance()->get_settings();

		return $settings->get_option( $group, $name );
	}


	protected function get_api_key() {

		return $this->get_settings( 'api', 'api_key' ) ?? '';
	}


	protected function get_domain() {

		return $this->get_settings( 'api', 'domain' ) ?? '';
	}


	protected function get_extra_rules() {

		return $this->get_settings( 'api', 'extra_rules' ) ?? '';
	}


	protected function get_settings_rules(): array {

		$extra_rules = $this->get_extra_rules();
		$rules       = [];

		if ( ! empty( $extra_rules ) ) {
			$rules = explode( "\n", $extra_rules );

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