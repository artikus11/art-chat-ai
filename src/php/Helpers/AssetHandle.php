<?php

namespace Art\ChatAi\Helpers;

use InvalidArgumentException;

class AssetHandle {

	protected string $prefix;


	protected array $handles;


	protected array $object_names;


	public function __construct( string $prefix, array $handles = [], array $object_names = [] ) {

		$this->prefix       = $prefix;
		$this->handles      = array_merge( $this->get_default_handles(), $handles );
		$this->object_names = array_merge( $this->get_default_object_names(), $object_names );
	}


	protected function get_default_handles(): array {

		return [
			'settings_script' => 'settings-script',
			'settings_style'  => 'settings-style',
			'public_script'   => 'public-script',
			'public_style'    => 'public-style',
			'admin_script'    => 'admin-script',
			'admin_style'     => 'admin-style',
		];
	}


	protected function get_default_object_names(): array {

		return [
			'public_settings' => 'public_settings',
			'admin_settings'  => 'settings',
			'chat_data'       => 'chat_data',
			'user_settings'   => 'user_settings',
		];
	}


	public function get_handle( string $asset_key ): string {

		if ( ! isset( $this->handles[ $asset_key ] ) ) {
			throw new InvalidArgumentException(
				sprintf( 'Unknown asset key: %s. Available keys: %s',
					$asset_key,
					implode( ', ', array_keys( $this->handles ) )
				)
			);
		}

		return sprintf( '%s-%s', $this->prefix, $this->handles[ $asset_key ] );
	}


	public function get_object_name( string $object_key ): string {

		if ( ! isset( $this->object_names[ $object_key ] ) ) {
			throw new InvalidArgumentException(
				sprintf( 'Unknown object key: %s. Available keys: %s',
					$object_key,
					implode( ', ', array_keys( $this->object_names ) )
				)
			);
		}

		return sprintf( '%s_%s', $this->prefix, $this->object_names[ $object_key ] );
	}


	public function add_handle( string $key, string $value ): void {

		$this->handles[ $key ] = $value;
	}


	public function add_object_name( string $key, string $value ): void {

		$this->object_names[ $key ] = $value;
	}


	public function get_all_handles(): array {

		$all_handles = [];
		foreach ( $this->handles as $key => $value ) {
			$all_handles[ $key ] = $this->get_handle( $key );
		}

		return $all_handles;
	}


	public function get_all_object_names(): array {

		$all_object_names = [];
		foreach ( $this->object_names as $key => $value ) {
			$all_object_names[ $key ] = $this->get_object_name( $key );
		}

		return $all_object_names;
	}
}