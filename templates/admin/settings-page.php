<?php
/**
 *
 */

use Art\ChatAi\Helpers\Utils;

?>
<div class="acai-settings">

	<div class="acai-settings-headline">
		<h1 class="wposa__title wposa__title--h1"><?php ;

			echo esc_html( Utils::get_plugin_title() ); ?>
			<span
				style="font-size:50%;">v<?php echo esc_html( Utils::get_plugin_version() ); ?></span>
		</h1>
	</div>
	<div id="chatbot-react-settings"></div>
</div>