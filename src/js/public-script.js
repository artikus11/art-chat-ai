/*global acai_public_settings */
import AIChat from '@artikus13/ai-chat-widget';
import '@artikus13/ai-chat-widget/dist/chat.css';

new AIChat(
	{
		apiOptions: {
			url: acai_public_settings.api.url,
			domain: acai_public_settings.api.domain,
			debug: acai_public_settings.general.debug
		},
		messagesOptions: acai_public_settings.messages,
		delayOptions: {
			chatShowDelay: acai_public_settings.general.chat_show_delay,      // Показ чата через 5 секунд после загрузки
			toggleShowDelay: acai_public_settings.general.toggle_show_delay     // Кнопка-тумблер появляется через 1 секунду
		}
	}
);