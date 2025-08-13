import AIChat from '@artikus13/ai-chat-widget';
import '@artikus13/ai-chat-widget/dist/chat.css';

new AIChat(
	{
		apiOptions: {
			url: 'https://chat.varman.pro/api/chat',
			greeting: 'Привет! Чем могу помочь?'
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