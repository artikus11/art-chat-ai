<?php

namespace Art\ChatAi\Admin;

/**
 * Класс для управления схемой настроек и дефолтными значениями.
 */
class SettingsSchema {

	public const SCHEMA = [
		'api'        => [
			'api_key'     => [
				'type'        => 'string',
				'default'     => '',
				'description' => 'API-ключ для авторизации в чате Varman',
			],
			'old_api_key' => [
				'type'    => 'string',
				'default' => '',
			],
			'url'         => [
				'type'    => 'string',
				'format'  => 'url',
				'default' => '',
			],
			'domain'      => [
				'type'    => 'string',
				'default' => '',
			],
			'extra_rules' => [
				'type'        => 'string',
				'format'      => 'textarea',
				'default'     => '',
				'description' => 'Дополнительные правила поведения чата (текст)',
			],
		],
		'general'    => [
			'debug'             => [
				'type'    => 'boolean',
				'default' => false,
			],
			'show_chat'         => [
				'type'    => 'boolean',
				'default' => false,
			],
			'chat_show_delay'   => [
				'type'    => 'number',
				'default' => 0,
			],
			'toggle_show_delay' => [
				'type'    => 'number',
				'default' => 0,
			],
		],
		'messages'   => [
			'in'  => [
				'greeting' => [
					'text'  => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Привет! Я помогу подобрать товар или оформить заказ. Просто напишите',
					],
					'delay' => [
						'type'    => 'number',
						'default' => 600,
					],
				],
				'followup' => [
					'text'  => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Вы всё ещё здесь? Могу предложить что-то интересное или помочь с выбором.',
					],
					'delay' => [
						'type'    => 'number',
						'default' => 15000,
					],
				],
				'fallback' => [
					'text'  => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Кажется, у нас временные сложности. Позвоните нам — мы обязательно поможем с заказом.',
					],
					'delay' => [
						'type'    => 'number',
						'default' => 0,
					],
				],
				'error'    => [
					'text'  => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Что-то пошло не так. Позвоните нам — решим вопрос с доставкой или выбором товара.',
					],
					'delay' => [
						'type'    => 'number',
						'default' => 0,
					],
				],
			],
			'out' => [
				'welcome'       => [
					'text'     => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Готов помочь! Нажмите, чтобы начать чат',
					],
					'delay'    => [
						'type'    => 'number',
						'default' => 10000,
					],
					'duration' => [
						'type'    => 'number',
						'default' => 8000,
					],
					'disable'  => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
				'followup'      => [
					'text'          => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Остались вопросы по товарам? Спрашивайте — подскажу, покажу, помогу выбрать.',
					],
					'delay'         => [
						'type'    => 'number',
						'default' => 30000,
					],
					'duration'      => [
						'type'    => 'number',
						'default' => 10000,
					],
					'cooldownHours' => [
						'type'    => 'number',
						'default' => 6,
					],
					'disable'       => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
				'returning'     => [
					'text'          => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Вы в чате — могу помочь с выбором товара, размером или доставкой. Просто спросите!',
					],
					'delay'         => [
						'type'    => 'number',
						'default' => 10000,
					],
					'duration'      => [
						'type'    => 'number',
						'default' => 10000,
					],
					'cooldownHours' => [
						'type'    => 'number',
						'default' => 6,
					],
					'disable'       => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
				'reconnect'     => [
					'text'          => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Рад снова вас видеть! Давайте найдём то, что нужно — я помню ваш вкус.',
					],
					'delay'         => [
						'type'    => 'number',
						'default' => 8000,
					],
					'duration'      => [
						'type'    => 'number',
						'default' => 10000,
					],
					'cooldownHours' => [
						'type'    => 'number',
						'default' => 24,
					],
					'disable'       => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
				'active_return' => [
					'text'          => [
						'type'    => 'string',
						'format'  => 'html',
						'default' => 'Хотите продолжить подбор? У меня есть пара интересных вариантов для вас.',
					],
					'delay'         => [
						'type'    => 'number',
						'default' => 5000,
					],
					'duration'      => [
						'type'    => 'number',
						'default' => 7000,
					],
					'cooldownHours' => [
						'type'    => 'number',
						'default' => 24,
					],
					'disable'       => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
			],
		],
		'appearance' => [
			'header_text'       => [
				'type'    => 'string',
				'default' => '',
			],
			'header_chat_text'  => [
				'type'    => 'string',
				'default' => '',
			],
			'chat_position'     => [
				'type'    => 'string',
				'enum'    => [ 'left', 'right' ],
				'default' => 'right',
			],
			'chat_color'        => [
				'type'    => 'string',
				'default' => '#007cba',
				'pattern' => '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
			],
			'accent_chat_color' => [
				'type'    => 'string',
				'default' => '#f00075',
				'pattern' => '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
			],
			'show_avatar'       => [
				'type'    => 'boolean',
				'default' => true,
			],
		],
	];


	/**
	 * Возвращает дефолтные значения всех настроек.
	 *
	 * @return array
	 */
	public function get_defaults(): array {

		static $defaults = null;

		if ( $defaults === null ) {
			$defaults = [];

			foreach ( self::SCHEMA as $group => $fields ) {
				$defaults[ $group ] = $this->flatten_schema( $fields );
			}
		}

		return $defaults;
	}


	/**
	 * Рекурсивно преобразует схему в дефолты.
	 *
	 * @param  array $schema Схема настроек.
	 *
	 * @return array Дефолтные значения.
	 */
	private function flatten_schema( array $schema ): array {

		$defaults = [];

		foreach ( $schema as $key => $field ) {
			// Если поле содержит ключ 'default', используем его
			if ( is_array( $field ) && isset( $field['default'] ) ) {
				$defaults[ $key ] = $field['default'];
			} // Если это подструктура (вложенный объект), рекурсивно обрабатываем её
			elseif ( is_array( $field ) && ! isset( $field['default'] ) ) {
				$defaults[ $key ] = $this->flatten_schema( $field );
			} // Иначе просто копируем значение
			else {
				$defaults[ $key ] = $field;
			}
		}

		return $defaults;
	}


	/**
	 * Возвращает дефолтные значения определённой группы.
	 *
	 * @param  string $group Группа настроек.
	 *
	 * @return array
	 */
	public function get_group_defaults( string $group ): array {

		$defaults = $this->get_defaults();

		return $defaults[ $group ] ?? [];
	}


	/**
	 * Возвращает конфиг конкретного поля из схемы.
	 *
	 * @param  string $group Группа.
	 * @param  string $key   Ключ поля.
	 *
	 * @return array|null
	 */
	public function get_field_config( string $group, string $key ): ?array {

		return self::SCHEMA[ $group ][ $key ] ?? null;
	}


	/**
	 * Возвращает REST-семантику для схемы.
	 *
	 * @return array
	 */
	public function get_rest_schema(): array {

		return [
			'type'       => 'object',
			'properties' => array_map( function ( $group_schema ) {

				return [
					'type'       => 'object',
					'properties' => $group_schema,
				];
			}, self::SCHEMA ),
		];
	}
}