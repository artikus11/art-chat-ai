<?php

namespace Art\ChatAi\Rest\Admin;

use Art\ChatAi\Api\Operation;

class PingOperation extends Operation {

	protected function get_api_key() {

		return $this->request->get_param( 'api_key' ) ?? '';
	}


	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		$result = $this->client->get_ping();

		if ( $result['success'] ) {
			return [
				'success' => true,
				'message' => '✅ Соединение установлено!',
			];
		}

		throw new \Exception( $result['message'] );
	}
}