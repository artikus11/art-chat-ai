import { makeAutoObservable, runInAction } from 'mobx';
import SyncService from '../services/SyncService';

class SyncStore {
	isSyncing = false;
	progress = 0;
	error = null;

	constructor( rootStore ) {
		this.rootStore = rootStore;

		makeAutoObservable( this );
	}

	ping = async () => {
		this.rootStore.uiStore.setLoading( 'ping', true )

		try {
			const result = await SyncService.pingToApi();

			runInAction( () => {
				if ( result.success ) {
					this.rootStore.uiStore.addNotice( 'success', result.message || 'Настройки успешно сохранены' );
				} else {
					this.rootStore.uiStore.addNotice( 'error', result.message || 'Ошибка при сохранении настроек' );
				}
			} );
		} catch ( error ) {
			runInAction( () => {
				this.rootStore.uiStore.addNotice( 'error', error.message || 'Неизвестная ошибка' );
			} );

		} finally {
			this.rootStore.uiStore.setLoading( 'ping', false )
		}

	};

	getAllAdditionals = async () => {
		this.rootStore.uiStore.setLoading( 'fetchAdditionals', true )

		try {
			const result = await SyncService.getAllAdditionals();

			runInAction( () => {
				if ( result.success ) {
					this.rootStore.uiStore.addNotice( 'success', result.message || 'Настройки успешно сохранены' );
				} else {
					this.rootStore.uiStore.addNotice( 'error', result.message || 'Ошибка при сохранении настроек' );
				}
			} );
			return result;
		} finally {
			this.rootStore.uiStore.setLoading( 'fetchAdditionals', false )
		}
	}
}

export default SyncStore;