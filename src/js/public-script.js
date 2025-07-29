class AIChatAssistant {
	constructor() {
		this.apiUrl = 'https://chat.varman.pro/api/chat';
		this.hasGreeted = false;
		this.hasFollowedUp = false;
		this.currentResponse = '';
		this.aiMessageElement = null;

		// Новые селекторы под обновлённую разметку
		this.elements = {
			chatbox: document.querySelector( '.chatbox' ),
			wrapper: document.querySelector( '.chatbox__wrapper' ),
			toggle: document.querySelector( '.chatbox__toggle' ),
			closeButton: document.querySelector( '.chatbox__close' ),
			messagesInner: document.querySelector( '.chatbox__messages-inner' ),
			textarea: document.querySelector( '.chatbox__textarea' ),
			sendButton: document.querySelector( '.chatbox__send-button' ),
			inputForm: document.querySelector( '.chatbox__input-form' )
		};

		this.init();
	}

	init() {
		this.bindEvents();
		this.autoShowToggle();
	}

	bindEvents() {
		// Кнопка "открыть/закрыть"
		this.elements.toggle.addEventListener( 'click', () => this.toggleChat() );

		// Кнопка закрытия в заголовке
		this.elements.closeButton.addEventListener( 'click', () => this.closeChat() );

		// Отправка формы
		this.elements.inputForm.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			this.sendMessage();
		} );

		// Отправка по Enter
		this.elements.textarea.addEventListener( 'keypress', ( e ) => {
			if ( e.key === 'Enter' && ! e.shiftKey ) {
				e.preventDefault();
				this.sendMessage();
			}
		} );

		// Авто-ресайз textarea
		this.elements.textarea.addEventListener( 'input', () => {
			this.autoResizeTextarea();
		} );
	}

	// Показать кнопку-тоггл через 5 сек
	autoShowToggle() {
		setTimeout( () => {
			this.elements.toggle.style.display = 'flex';
		}, 5000 );
	}

	// Переключить чат (открыть/закрыть)
	toggleChat() {
		const isHidden = this.elements.wrapper.style.display === 'none' || ! this.elements.wrapper.style.display;

		if ( isHidden ) {
			this.openChat();
		} else {
			this.closeChat();
		}
	}

	openChat() {
		this.elements.wrapper.style.display = 'flex';
		this.elements.toggle.style.display = 'none';

		// Автоприветствие
		if ( ! this.hasGreeted ) {
			setTimeout( () => {
				this.sendMessage( 'Добрый день! Нужна ли вам помощь в подборе? Меня зовут Лолита. Я с удовольствием вам помогу.' );
				this.hasGreeted = true;
			}, 600 );

			// Повторное напоминание
			setTimeout( () => {
				if ( this.elements.messagesInner.children.length < 2 && ! this.hasFollowedUp ) {
					this.sendMessage( 'Вы всё ещё думаете? Готова помочь с выбором!' );
					this.hasFollowedUp = true;
				}
			}, 15000 );
		}

		// Фокус на поле ввода
		this.elements.textarea.focus();
	}

	closeChat() {
		this.elements.wrapper.style.display = 'none';
		this.elements.toggle.style.display = 'flex';
	}

	// Авто-ресайз textarea
	autoResizeTextarea() {
		const textarea = this.elements.textarea;
		textarea.style.height = 'auto';
		const newHeight = Math.min( textarea.scrollHeight, 120 ); // максимум 120px
		textarea.style.height = `${ newHeight }px`;
	}

	preload() {
		const preload = document.createElement( 'span' );
		preload.classList.add( 'chatbox__loader' );
	}

	// Добавить сообщение
	addMessage( text, isUser ) {
		const messageElement = document.createElement( 'div' );
		messageElement.classList.add( 'chatbox__message' );
		messageElement.classList.add( isUser ? 'chatbox__message--user' : 'chatbox__message--operator' );

		if ( ! isUser ) {
			const avatar = document.createElement( 'span' );
			avatar.classList.add( 'chatbox__message-avatar' );
			avatar.style.backgroundImage = 'url(\'https://image.crisp.chat/avatar/website/-JzqEmX56venQuQw4YV8/120/?1753352557765\')';
			messageElement.appendChild( avatar );
		}

		const content = document.createElement( 'div' );
		content.classList.add( 'chatbox__message-content' );
		console.log( text );
		const textSpan = document.createElement( 'div' );
		textSpan.classList.add( 'chatbox__message-text' );
		textSpan.textContent = text;

		content.appendChild( textSpan );
		messageElement.appendChild( content );

		this.elements.messagesInner.appendChild( messageElement );
		this.scrollToBottom();
		return messageElement;
	}

	scrollToBottom() {
		this.elements.messagesInner.scrollTop = this.elements.messagesInner.scrollHeight;
	}

	startNewAIResponse() {
		this.currentResponse = '';
		this.aiMessageElement = this.addMessage( '', false );
	}

	updateAIResponse( text ) {
		if ( this.aiMessageElement ) {
			const textSpan = this.aiMessageElement.querySelector( '.chatbox__message-text' );
			if ( textSpan ) {
				textSpan.textContent = text;
			}
			this.scrollToBottom();
		}
	}

	/*async sendMessage() {
	 const message = this.elements.textarea.value.trim();
	 if ( ! message || this.elements.sendButton.disabled ) {
	 return;
	 }

	 this.elements.sendButton.disabled = true;
	 this.addMessage( message, true );
	 this.elements.textarea.value = '';
	 this.autoResizeTextarea();

	 try {
	 this.startNewAIResponse();

	 const chatId = localStorage.getItem( 'chatId' );
	 const payload = { message, idChat: chatId || null };

	 const response = await fetch( this.apiUrl, {
	 method: 'POST',
	 headers: {
	 'Content-Type': 'application/json',
	 'Accept': 'text/event-stream'
	 },
	 body: JSON.stringify( payload )
	 } );

	 if ( ! response.ok ) {
	 throw new Error( `Ошибка API: ${ response.status }` );
	 }

	 const reader = response.body.getReader();
	 const decoder = new TextDecoder();

	 while ( true ) {
	 const { value, done } = await reader.read();
	 if ( done ) {
	 break;
	 }

	 const chunk = decoder.decode( value, { stream: true } );

	 const lines = chunk.split( '\n' );
	 for ( const line of lines ) {
	 if ( ! line.trim() ) {
	 continue;
	 }
	 if ( ! line.trim() ) {
	 continue;
	 }

	 if ( line.startsWith( 'data: ' ) ) {
	 let data = line.substring( 6 ).trim();

	 if ( data.startsWith( '[CHAT_ID-' ) && data.endsWith( ']' ) ) {
	 const newChatId = data.slice( 9, -1 );
	 localStorage.setItem( 'chatId', newChatId );
	 continue;
	 }

	 if ( data === '[DONE]' ) {
	 continue;
	 }

	 if ( data.startsWith( '"' ) && data.endsWith( '"' ) ) {
	 let jsonStr = data.trim();
	 if (jsonStr.startsWith('"') && jsonStr.endsWith('"')) {
	 jsonStr = jsonStr.slice(1, -1);
	 }

	 // 2. Заменяем все экранированные кавычки
	 jsonStr = jsonStr.replace(/\\u0022/g, '"');

	 // 3. Находим последнюю закрывающую скобку
	 const lastBraceIndex = jsonStr.lastIndexOf('}');
	 if (lastBraceIndex === -1) {
	 throw new Error("Invalid JSON: no closing brace");
	 }

	 // 4. Обрезаем все после последней скобки
	 jsonStr = jsonStr.substring(0, lastBraceIndex + 1);

	 // 5. Удаляем все невидимые символы
	 jsonStr = jsonStr.trim();

	 try {

	 const parsed = JSON.parse( jsonStr );

	 if ( parsed.response !== undefined ) {
	 this.currentResponse += parsed.response;
	 this.updateAIResponse( this.currentResponse );
	 }

	 } catch ( e ) {
	 console.error( '❌ Ошибка парсинга JSON:', e, 'Исходная строка:', data, 'Очищенная строка:', jsonStr );
	 }
	 }
	 }
	 }
	 }
	 } catch ( error ) {
	 console.error( 'Ошибка при запросе к ИИ:', error );
	 this.addMessage( `Ошибка: ${ error.message }`, false );
	 } finally {
	 this.elements.sendButton.disabled = false;
	 }
	 }*/

	async sendMessage() {
		const message = this.elements.textarea.value.trim();
		if ( ! message || this.elements.sendButton.disabled ) {
			return;
		}

		this.elements.sendButton.disabled = true;
		this.addMessage( message, true );
		this.elements.textarea.value = '';
		this.autoResizeTextarea();

		try {
			this.startNewAIResponse();
			const chatId = localStorage.getItem( 'chatId' );
			const payload = { message, idChat: chatId || null };

			const response = await fetch( this.apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'text/event-stream'
				},
				body: JSON.stringify( payload )
			} );

			if ( ! response.ok ) {
				throw new Error( `Ошибка API: ${ response.status }` );
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while ( true ) {
				const { value, done } = await reader.read();
				if ( done ) {
					break;
				}

				buffer += decoder.decode( value, { stream: true } );

				// Обрабатываем все полные события
				while ( true ) {
					const eventEnd = buffer.indexOf( '\n\n' );
					if ( eventEnd === -1 ) {
						break;
					}

					const eventData = buffer.substring( 0, eventEnd );
					buffer = buffer.substring( eventEnd + 2 );

					this.processSSEEvent( eventData );
				}
			}

			// Обрабатываем оставшиеся данные
			if ( buffer.trim() ) {
				this.processSSEEvent( buffer );
			}
		} catch ( error ) {
			console.error( 'Ошибка при запросе к ИИ:', error );
			this.addMessage( `Ошибка: ${ error.message }`, false );
		} finally {
			this.elements.sendButton.disabled = false;
		}
	}

	processSSEEvent( eventData ) {
		try {
			// Игнорируем пустые строки и события без данных
			if ( ! eventData.trim() || ! eventData.startsWith( 'data: ' ) ) {
				return;
			}

			const data = eventData.substring( 6 ).trim();

			// Обработка специальных маркеров
			if ( data.startsWith( '[CHAT_ID-' ) && data.endsWith( ']' ) ) {
				const newChatId = data.slice( 9, -1 );
				localStorage.setItem( 'chatId', newChatId );
				return;
			}

			if ( data === '[DONE]' ) {
				return;
			}
console.log(data);
			// Пытаемся распарсить JSON
			let parsed;
			try {
				// Сначала попробуем распарсить как JSON (возможно, это объект)
				parsed = JSON.parse(data);
			} catch (e) {
				// Если не получилось — возможно, это строка в кавычках: "{...}"
				try {
					const unquoted = data
						.replace(/^"(.*)"$/, '$1')        // Убираем внешние кавычки
						.replace(/\\u0022/g, '"')         // Заменяем \u0022 на "
						.replace(/\\"/g, '"');            // Экранированные кавычки
					parsed = JSON.parse(unquoted);
				} catch (e2) {
					// Если всё ещё не парсится — возможно, это просто текст
					if (data && !data.includes('{') && !data.includes('}')) {
						this.currentResponse += data;
						this.updateAIResponse(this.currentResponse);
					}
					return;
				}
			}

			// Теперь проверяем, есть ли в объекте поле response
			if (parsed.response !== undefined) {
				// Убираем возможные служебные кавычки из response
				let responseText = parsed.response
					.replace(/^"(.*)"$/, '$1')  // Удаляем внешние кавычки, если есть
					.replace(/\\u0022/g, '"')
					.replace(/\\"/g, '"');

				this.currentResponse += responseText;
				this.updateAIResponse(this.currentResponse);
			}
		} catch ( e ) {
			console.error( 'Ошибка обработки SSE события:', e );
		}
	}
}

// Запуск при загрузке DOM
document.addEventListener( 'DOMContentLoaded', () => {
	new AIChatAssistant();
} );