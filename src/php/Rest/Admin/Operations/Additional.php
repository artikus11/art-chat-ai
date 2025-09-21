<?php

namespace Art\ChatAi\Rest\Admin\Operations;

use Art\ChatAi\Api\Operation;

class Additional extends Operation {

	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		$method    = $this->request->get_method();
		$file_name = $this->get_file_rules_name();
		$rules     = $this->get_settings_rules();

		switch ( $method ) {
			case 'GET':
				$result = $this->client->get_additional( $file_name );
				break;
			case 'POST':
				$result = $this->client->add_additional( $rules, $file_name );
				break;
			case 'PUT':
				$result = $this->client->update_additional( $rules, $file_name );
				break;
			case 'DELETE':
				$result = $this->client->delete_additional( $file_name );
				break;
			default:
				$result = [
					'success' => false,
					'message' => 'Метод не поддерживается',
					'status'  => 405,
				];
				break;
		}

		if ( $result['success'] ) {
			return [
				'success' => true,
				'data'    => $result['data'],
				'message' => '✅ Соединение установлено!!!!',
			];
		}

		$status = $result['status'] ?? 500;

		throw new \Exception( $result['message'], $status );
	}
}