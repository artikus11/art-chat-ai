<?php

namespace Art\ChatAi\Traits;

trait SingletonTrait {

	/**
	 * @var static|null
	 */
	private static ?self $instance = null;


	/**
	 * Получает единственный экземпляр класса.
	 *
	 * @return static
	 */
	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new static();
		}

		return self::$instance;
	}


	/**
	 * Запрещаем клонирование.
	 */
	private function __clone() {}


	/**
	 * @throws \Exception выбрасываем ошибку.
	 */
	public function __wakeup() {

		throw new \Exception( 'Cannot unserialize singleton' );
	}
}
