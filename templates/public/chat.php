<div class="chatbox" >
	<div class="chatbox__wrapper">
		<!-- Header -->
		<div class="chatbox__header" style="width: 400px !important;">
			<div class="chatbox__header-inner">
				<!-- Close button -->
				<button class="chatbox__close" tabindex="0" aria-label="Close chat">
					<span class="chatbox__close-icon"></span>
				</button>
			</div>
		</div>

		<!-- Main content -->
		<div class="chatbox__body" style="height: 580px !important;">
			<!-- Network error -->
			<div class="chatbox__alert chatbox__alert--offline" >
				<span class="chatbox__alert-icon"></span>
				<div class="chatbox__alert-content">
					<span class="chatbox__alert-title">Network offline. Reconnecting...</span>
					<span class="chatbox__alert-message">No messages can be received or sent for now.</span>
				</div>
			</div>

			<!-- Messages -->
			<div id="chatbox-messages" style="margin-bottom: 0px !important;">
				<div class="chatbox__messages-inner">
					<div class="chatbox__message-list">
						<div class="chatbox__message chatbox__message--operator" data-first-of-group="true" data-last-of-group="true" data-last-of-thread="true">
							<span class="chatbox__message-avatar" style="background-image: url('https://image.crisp.chat/avatar/website/-JzqEmX56venQuQw4YV8/120/?1753352557765')"></span>
							<span class="chatbox__message-author">Crisp</span>
							<div class="chatbox__message-content">
								<div class="chatbox__message-text">
									<span class="chatbox__message-text-inner">How can we help with Crisp?</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Message input -->
			<div class="chatbox__input-container" data-has-value="false" data-is-locked="false" data-retain-lock="false">
				<form name="form_message" action="#" method="post" class="chatbox__input-form">
          <textarea
	          name="message"
	          cols="20"
	          rows="1"
	          dir="auto"
	          autocapitalize="off"
	          autocomplete="off"
	          aria-controls="chatbox-messages"
	          tabindex="0"
	          class="chatbox__textarea"
	          placeholder="Compose your message..."
	          aria-label="Compose your message..."
	          style="width: 320px !important;"
          ></textarea>
				</form>
				<button class="chatbox__send-button" tabindex="0" aria-label="Send">
					<span class="chatbox__send-icon"></span>
				</button>
			</div>

		</div>

		<!-- Toggle button (minimize/maximize) -->
		<button class="chatbox__toggle" tabindex="0" role="button" data-visible="true" data-maximized="true" aria-label="Close chat">
			<span class="chatbox__toggle-icon"></span>
			<span class="chatbox__toggle-badge" data-has-unread="false">
        <span class="chatbox__toggle-dot"></span>
      </span>
		</button>

	</div>
</div>