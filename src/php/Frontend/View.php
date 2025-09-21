<?php

namespace Art\ChatAi\Frontend;

use Art\ChatAi\Helpers\AssetHandle;
use Art\ChatAi\Helpers\Helper;
use Art\ChatAi\Main;

class View {

	protected ?Main $main;


	protected AssetHandle $asset_handle;


	public function __construct( Main $main ) {

		$this->main = $main;

		$this->asset_handle = new AssetHandle( $this->main->get_utils()->get_plugin_prefix() );
	}


	public function init_hooks(): void {

		add_action( 'wp_head', [ $this, 'load_chat_enqueue' ], 100 );
		add_action( 'wp_footer', [ $this, 'load_chat' ], 100 );
	}


	public function load_chat(): void {

		if ( ! $this->is_show_chat() ) {
			return;
		}

		load_template(
			$this->main->get_templater()->get_template( 'public/chat.php' ),
			true,
			[
				'options' => $this->main->get_settings()->get(),
			]
		);
	}


	public function load_chat_enqueue(): void {

		if ( ! $this->is_show_chat() ) {
			return;
		}

		wp_enqueue_script( $this->asset_handle->get_handle( 'public_script' ) );
		wp_enqueue_style( $this->asset_handle->get_handle( 'public_style' ) );
	}


	/**
	 * @return bool
	 */
	protected function is_show_chat(): bool {

		$show_chat = $this->main->get_settings()->get_option( 'general', 'show_chat' );

		if ( ! $show_chat ) {
			return false;
		}

		return true;
	}
}