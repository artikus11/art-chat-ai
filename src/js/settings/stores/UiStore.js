import { makeAutoObservable, runInAction } from 'mobx';

class UiStore {
	notices = [];
	loadingStates = {
		ping: false,
		fetchAdditionals: false,
		saveSettings: false,
		sync: false,
		changeKey: false,
		resetKey: false,
	};
	modal = {
		isOpen: false,
		title: '',
		content: null,
		actions: null, // массив кнопок
		size: 'medium', // 'small', 'medium', 'large'
		onClose: null, // опциональный колбэк при закрытии
	};

	constructor( rootStore ) {
		this.rootStore = rootStore;
		makeAutoObservable( this, {}, { autoBind: true } );
	}

	setLoading( key, value ) {
		this.loadingStates = { ...this.loadingStates, [ key ]: value };
	}

	get isLoading() {
		return Object.values( this.loadingStates ).some( Boolean );
	}

	get isLoadingPing() {
		return this.loadingStates.ping;
	}

	get isLoadingAdditionals() {
		return this.loadingStates.fetchAdditionals;
	}

	get isSavingSettings() {
		return this.loadingStates.saveSettings;
	}

	get isSyncing() {
		return this.loadingStates.sync;
	}

	get isChangingKey() {
		return this.loadingStates.changeKey;
	}

	get isResetKey() {
		return this.loadingStates.resetKey;
	}

	get isModalOpen() {
		return this.modal.isOpen;
	}

	get modalTitle() {
		return this.modal.title;
	}

	get modalContent() {
		return this.modal.content;
	}

	get modalActions() {
		return this.modal.actions;
	}

	get modalSize() {
		return this.modal.size;
	}

	addNotice( type, message, duration = 5000 ) {
		const id = Date.now();
		this.notices.push( { id, type, message } );

		setTimeout( () => this.removeNotice( id ), duration );
	}

	removeNotice( id ) {
		this.notices = this.notices.filter( notice => notice.id !== id );
	}

	showSuccess( message ) {
		this.addNotice( 'success', message );
	}

	showError( message ) {
		this.addNotice( 'error', message );
	}

	showNotification( { type = 'info', message, duration } ) {
		this.addNotice( type, message, duration );
	}

	// Открытие модального окна
	openModal( options ) {
		const {
			title = 'Модальное окно',
			content = null,
			actions = null,
			size = 'medium',
			onClose = null,
		} = options;

		runInAction( () => {
			this.modal = {
				isOpen: true,
				title,
				content,
				actions,
				size,
				onClose,
			};
		} );
	}

	// Закрытие модального окна
	closeModal() {
		const { onClose } = this.modal;
		if ( onClose ) {
			onClose();
		}

		runInAction( () => {
			this.modal.isOpen = false;
			// Очищаем, чтобы не было утечек
			this.modal = {
				...this.modal,
				isOpen: false,
				title: '',
				content: null,
				actions: null,
				onClose: null,
			};
		} );
	}

	reset() {
		this.notices = [];
		this.loadingStates = {
			ping: false,
			fetchAdditionals: false,
			saveSettings: false,
			sync: false,
			changeKey: false,
		};
	}
}

export default UiStore;