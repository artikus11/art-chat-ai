<?php

namespace Art\ChatAi\Rest\Admin\Operations;

use Art\ChatAi\Api\Operation;

class Ping extends Operation {

	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		$result = $this->client->get_ping();;
		if ( $result['success'] ) {
			return [
				'success' => true,
				'data'    => $result['data'],
				'message' => '✅ Соединение установлено!',
			];
		}

		throw new \Exception( $result['message'] );
	}
}