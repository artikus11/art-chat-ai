<?php
/**
 *
 * @global $args
 */

$header_chat_text = $args['options']['headerChatText'] ?? '';
?>
<div class="chatbox" id="chat-container" data-aichat-box>
	<button class="chatbox__toggle" data-aichat-toggle aria-label="Открыть чат">
		<span class="chatbox__toggle-avatar"></span>
	</button>

	<div class="chatbox__wrapper" data-aichat-wrapper>
		<div class="chatbox__header">
			<span><?php echo esc_html( $header_chat_text ); ?></span>
			<button class="chatbox__close" data-aichat-close aria-label="Закрыть чат"></button>
		</div>
		<div class="chatbox__messages-inner" data-aichat-messages-inner></div>
		<form class="chatbox__input-form" data-aichat-input-form>
			<textarea
				class="chatbox__textarea"
				placeholder="Напишите сообщение..."
				data-aichat-textarea
				rows="1"></textarea>
			<button
				type="submit"
				class="chatbox__send-button"
				tabindex="0"
				aria-label="Send"
				data-aichat-send-button>
				<span class="chatbox__send-icon"></span>
			</button>
	</div>
</div>


