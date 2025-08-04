<?php

namespace Art\ChatAi\Rest\Admin;

use Art\ChatAi\Api\Operation;

class SyncOperation extends Operation {

	/**
	 * @throws \Exception
	 */
	protected function perform_operation(): array {

		try {
			$this->send_additional_rules();
			$this->regenerate_embeddings();

			return [
				'success' => true,
				'message' => '✅ Успешно синхронизировано с чат-ботом!',
			];
		} catch ( \Exception $e ) {
			throw new \Exception( $e->getMessage() );
		}
	}


	/**
	 * Отправка дополнительных правил (additional)
	 *
	 * @throws \Exception
	 */
	private function send_additional_rules(): void {

		$settings = get_option( 'acai_settings', [] );
		$rules    = $settings['additional_rules'] ?? [];

		if ( empty( $rules ) ) {
			throw new \Exception( 'Нет правил для отправки' );
		}

		$result = $this->client->add_additional( $rules, 'wordpress_rules.add' );

		if ( ! $result['success'] ) {
			throw new \Exception( 'Ошибка отправки правил: ' . $result['message'] );
		}
	}


	/**
	 * Перегенерация embeddings
	 *
	 * @throws \Exception
	 */
	private function regenerate_embeddings(): void {

		$result = $this->client->regenerate_embeddings( true );

		if ( ! $result['success'] ) {
			throw new \Exception( 'Ошибка генерации embeddings: ' . $result['message'] );
		}
	}
}