/*global acaiPublicSettings */
import AIChat from '@artikus13/ai-chat-widget';
import '@artikus13/ai-chat-widget/dist/chat.css';

new AIChat(
	{
		apiOptions: {
			url: acaiPublicSettings.urlApi,
			domain: acaiPublicSettings.domainApi,
			greeting: acaiPublicSettings.greetingApi
		},
		themeOptions: {
			color: '#fff',
			size: 'large'
		},
		selectorsOptions: {
			container: '#chat-container',
			selectors: { /* ... */ },
			classes: { /* ... */ }
		},
		delayOptions: {
			greetDelay: 600,
			followupDelay: 15000
		}
	}
);