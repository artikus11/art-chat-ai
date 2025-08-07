<?php

namespace Art\ChatAi\Rest\Admin\Operations;

use Art\ChatAi\Api\Operation;

class ChangeKey extends Operation {

	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		$result = $this->client->change_api_key();

		if ( $result['success'] ) {
			return [
				'success' => true,
				'data'    => $result['data'],
				'message' => '✅ Ключ обновлен!',
			];
		}

		throw new \Exception( $result['message'] );
	}
}