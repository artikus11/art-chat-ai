<?php

namespace Art\ChatAi\Admin;

/**
 * Класс для санитизации настроек по схеме.
 */
class SettingsSanitizer {

	/**
	 * Санитизация данных настроек по схеме.
	 *
	 * @param  array $input    Входные данные.
	 * @param  array $schema   Схема (из SettingsSchema).
	 * @param  array $defaults Дефолтные значения.
	 *
	 * @return array Санитизированные данные.
	 */
	public function sanitize( array $input, array $schema, array $defaults ): array {

		$sanitized = [];

		foreach ( $schema['properties'] as $group => $groupSchema ) {
			$sanitized[ $group ] = $this->sanitize_group(
				$input[ $group ] ?? [],
				$groupSchema['properties'] ?? [],
				$defaults[ $group ] ?? []
			);
		}

		return $sanitized;
	}


	/**
	 * Рекурсивно санирует группу настроек.
	 *
	 * @param  array $input    Входные данные.
	 * @param  array $schema   Схема группы.
	 * @param  array $defaults Дефолтные значения группы.
	 *
	 * @return array
	 */
	private function sanitize_group( array $input, array $schema, array $defaults ): array {

		$sanitized = [];

		foreach ( $schema as $key => $fieldSchema ) {
			$value = $input[ $key ] ?? $defaults[ $key ];

			// Если это подгруппа (вложенная структура), рекурсивно санируем
			if ( is_array( $fieldSchema ) && ! isset( $fieldSchema['type'] ) ) {
				$sanitized[ $key ] = $this->sanitize_group(
					$input[ $key ] ?? [],
					$fieldSchema,
					$defaults[ $key ] ?? []
				);

				continue;
			}

			$sanitized[ $key ] = $this->sanitize_field( $value, $fieldSchema, $defaults[ $key ] );
		}

		return $sanitized;
	}


	/**
	 * Санитизация одного поля по его схеме.
	 *
	 * @param  mixed $value   Значение.
	 * @param  array $schema  Схема поля.
	 * @param  mixed $default Дефолт.
	 *
	 * @return mixed
	 */
	private function sanitize_field( $value, $schema, $default ) {

		$type = $schema['type'] ?? 'string';

		switch ( $type ) {
			case 'string':
				$value = (string) $value;

				if ( isset( $schema['format'] ) ) {
					switch ( $schema['format'] ) {
						case 'email':
							$clean = sanitize_email( $value );

							return is_email( $clean ) ? $clean : $default;

						case 'url':
							$clean = esc_url_raw( $value );

							return $clean ? : $default;

						case 'html':
							return wp_kses_post( $value );

						case 'textarea':
							return sanitize_textarea_field( $value );

						default:
							$value = sanitize_text_field( $value );
					}
				} else {
					$value = sanitize_text_field( $value );
				}

				if ( isset( $schema['pattern'] ) ) {
					if ( ! preg_match( '/^' . $schema['pattern'] . '$/u', $value ) ) {
						return $default;
					}
				}

				if ( isset( $schema['enum'] ) && is_array( $schema['enum'] ) ) {
					if ( ! in_array( $value, $schema['enum'], true ) ) {
						return $default;
					}
				}

				return $value;

			case 'boolean':
				return rest_sanitize_value_from_schema( $value, [ 'type' => 'boolean' ], 'boolean_field' );

			case 'integer':
			case 'number':
				$number = filter_var( $value, FILTER_VALIDATE_FLOAT );

				return $number === false ? $default : (float) $number;

			default:
				return $default;
		}
	}
}