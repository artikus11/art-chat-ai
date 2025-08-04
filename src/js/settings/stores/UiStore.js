import { makeAutoObservable, runInAction } from 'mobx';

class UiStore {
	isLoading = false;
	isSaving = false;
	notices = [];

	constructor( rootStore ) {
		this.rootStore = rootStore;
		makeAutoObservable( this );
	}

	setLoading = ( state ) => {
		this.isLoading = state;
	};

	setSaving = ( state ) => {
		this.isSaving = state;
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