import { makeAutoObservable, runInAction } from 'mobx';

class UiStore {
	isLoading = false;
	isSaving = false;
	isSyncing = false;
	notices = [];

	loadingStates = {
		ping: false,
		fetchAdditionals: false,
		saveSettings: false,
	};

	constructor( rootStore ) {
		this.rootStore = rootStore;

		makeAutoObservable( this );
	}

	/*setLoading = ( state ) => {
		this.isLoading = state;
	};*/

	setLoading(key, value) {
		runInAction(() => {
			this.loadingStates = { ...this.loadingStates, [key]: value };
		});
	}
	get isLoadingPing() {
		return this.loadingStates.ping;
	}

	get isLoadingAdditionals() {
		return this.loadingStates.fetchAdditionals;
	}
	get isSaving() {
		return this.loadingStates.saveSettings;
	}

	setSaving = ( state ) => {
		this.isSaving = state;
	};

	setSyncing = ( state ) => {
		this.isSyncing = state;
	};

	handleSettingsSave = async () => {
		this.setSaving( true );

		try {
			const result = await this.rootStore.settingsStore.saveSettings();
			runInAction( () => {
				if ( result.success ) {
					this.addNotice( 'success', result.message || 'Настройки успешно сохранены' );
				} else {
					this.addNotice( 'error', result.message || 'Ошибка при сохранении настроек' );
				}
			} );

		} catch ( error ) {
			runInAction( () => {
				this.addNotice( 'error', error.message || 'Неизвестная ошибка' );
			} );

		} finally {
			this.setSaving( false );
		}
	};

	addNotice = ( type, message, duration = 5000 ) => {
		const id = Date.now();
		this.notices.push( { id, type, message } );

		setTimeout( () => {
			this.removeNotice( id );
		}, duration );
	}

	removeNotice = ( id ) => {
		this.notices = this.notices.filter( notice => notice.id !== id );
	}

	setSuccess = ( message ) => {
		this.addNotice( 'success', message );
	}

	setError = ( message ) => {
		this.addNotice( 'error', message );
	}

	reset = () => {
		this.isLoading = false;
		this.isSaving = false;
		this.notices = [];
	}
}

export default UiStore;