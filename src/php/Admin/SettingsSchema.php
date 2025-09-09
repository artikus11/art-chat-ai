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
				'default'     => '123',
				'description' => 'API-ключ для авторизации в чате Varman',
			],
			'old_api_key' => [
				'type'    => 'string',
				'default' => '',
			],
			'url'    => [
				'type'    => 'string',
				'default' => '',
			],
			'domain'      => [
				'type'    => 'string',
				'default' => '',
			],
			'extra_rules' => [
				'type'        => 'string',
				'default'     => '',
				'description' => 'Дополнительные правила поведения чата (текст)',
			],
			'debug'       => [
				'type'    => 'boolean',
				'default' => false,
			],
		],
		'messages'   => [
			'greeting_text'  => [
				'type'        => 'string',
				'default'     => 'Привет! Я бот. Чем могу помочь?',
				'description' => 'Первое сообщение. Приветствие',
			],
			'greeting_delay' => [
				'type'    => 'number',
				'default' => 0,
			],
			'followup_text'  => [
				'type'        => 'string',
				'default'     => 'Вы всё ещё думаете? Готова помочь!',
				'description' => 'Второе сообщение. При бездействии',
			],
			'followup_delay' => [
				'type'    => 'number',
				'default' => 15000,
			],
			'fallback_text'  => [
				'type'        => 'string',
				'default'     => 'Что-то пошло не так, позвоните нам',
				'description' => 'Сообщение при ошибке',
			],
			'fallback_delay' => [
				'type'    => 'number',
				'default' => 0,
			],
			'error_text'     => [
				'type'        => 'string',
				'default'     => 'Что-то пошло не так, позвоните нам',
				'description' => 'Сообщение при ошибке',
			],
			'error_delay'    => [
				'type'    => 'number',
				'default' => 0,
			],
		],
		'appearance' => [
			'show_chat'         => [
				'type'    => 'boolean',
				'default' => false,
			],
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


	public function get_defaults(): array {

		static $defaults = null;

		if ( $defaults === null ) {
			$defaults = [];
			foreach ( self::SCHEMA as $group => $fields ) {
				$defaults[ $group ] = [];
				foreach ( $fields as $key => $config ) {
					$defaults[ $group ][ $key ] = $config['default'];
				}
			}
		}

		return $defaults;
	}


	public function get_group_defaults( string $group ): array {

		$defaults = $this->get_defaults();

		return $defaults[ $group ] ?? [];
	}


	public function get_field_config( string $group, string $field ): ?array {

		return self::SCHEMA[ $group ][ $field ] ?? null;
	}
}