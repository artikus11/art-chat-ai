<?php

namespace Art\ChatAi\Frontend;

use Art\ChatAi\Helpers\Helper;
use Art\ChatAi\Helpers\Utils;
use Art\ChatAi\Main;

class View {

	protected ?Main $main;


	public function __construct( Main $main ) {

		$this->main = $main;
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
			[]
		);
	}


	public function load_chat_enqueue(): void {

		if ( ! $this->is_show_chat() ) {
			return;
		}

		wp_enqueue_script( $this->main->get_utils()->get_plugin_prefix() . '-public-script' );
		wp_enqueue_style( $this->main->get_utils()->get_plugin_prefix() . '-public-style' );
	}


	/**
	 * @return bool
	 */
	protected function is_show_chat(): bool {

		$show_chat = Helper::get_option( 'showChat' );
		do_action( 'qm/info', $show_chat );
		if ( ! $show_chat ) {
			return false;
		}

		return true;
	}
}