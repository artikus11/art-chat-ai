<div class="chatbox">
	<div class="chatbox__wrapper">
		<div class="chatbox__header">
			<div class="chatbox__header-inner">
				<button class="chatbox__close" type="button" tabindex="0" aria-label="Close chat">
					<span class="chatbox__close-icon"></span>
				</button>
			</div>
		</div>

		<div class="chatbox__body">
			<!-- Messages -->
			<div id="chatbox-messages" class="chatbox__message">
				<div class="chatbox__messages-inner"></div>
			</div>

			<div class="chatbox__input-wrapper">
				<div class="chatbox__input-container">
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
			          placeholder="Составьте свое сообщение..."
		          ></textarea>
						<button class="chatbox__send-button" tabindex="0" aria-label="Send">
							<span class="chatbox__send-icon"></span>
						</button>
					</form>

				</div>
			</div>

		</div>
	</div>

	<button class="chatbox__toggle" type="button">
		<span class="chatbox__toggle-avatar">

		</span>
	</button>
</div>