import { makeAutoObservable } from 'mobx';
import SettingsStore from './SettingsStore';
import SyncStore from './SyncStore';
import UiStore from './UiStore';

class RootStore {
	constructor() {
		this.uiStore = new UiStore( this );
		this.settingsStore = new SettingsStore( this );
		this.syncStore = new SyncStore( this );

		makeAutoObservable( this, {}, { autoBind: true } );
	}

	async withLoading( loadingKey, fn, options = {} ) {
		const { showSuccess = false, successMessage } = options;

		try {
			this.uiStore.setLoading( loadingKey, true );
			const result = await fn();

			if ( showSuccess && successMessage ) {
				this.uiStore.showSuccess( successMessage );
			} else if ( showSuccess && result?.message ) {
				this.uiStore.showError( result.message );
			}

			return result;
		} catch ( error ) {
			this.uiStore.showError( error.message || 'Неизвестная ошибка' );
			throw error;
		} finally {
			this.uiStore.setLoading( loadingKey, false );
		}
	}

	updateSettings( newSettings ) {
		this.settingsStore.updateSettings( newSettings );
	}
}

export default new RootStore();