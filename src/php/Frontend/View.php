<?php

namespace Art\ChatAi\Frontend;

use Art\ChatAi\Main;

class View {

	protected ?Main $main;


	public function __construct( Main $main ) {

		$this->main = $main;
	}


	public function init_hooks(): void {

		add_action( 'wp_footer', [ $this, 'load_chat' ], 100 );
	}


	public function load_chat(): void {

		load_template(
			$this->main->get_templater()->get_template( 'public/chat.php' ),
			true,
			[]
		);
	}
}