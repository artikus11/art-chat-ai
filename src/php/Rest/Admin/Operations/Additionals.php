<?php

namespace Art\ChatAi\Rest\Admin\Operations;

use Art\ChatAi\Api\Operation;

class Additionals extends Operation {

	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		$result = $this->client->get_all_additional();

		if ( $result['success'] ) {
			return [
				'success' => true,
				'data'    => $result['data'],
				'message' => '✅ Соединение установлено',
			];
		}

		throw new \Exception( $result['message'] );
	}
}