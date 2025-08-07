import { makeAutoObservable, runInAction } from 'mobx';
import SyncService from '../services/SyncService';

class SyncStore {

	constructor( rootStore ) {
		this.rootStore = rootStore;
		this.syncService = new SyncService();

		makeAutoObservable( this );
	}

	ping = async () => {
		return this.rootStore.withLoading( 'ping', () => this.syncService.pingToApi(), {
			showSuccess: true,
			successMessage: 'Соединение успешно'
		} );
	};

	sync = async () => {
		return this.rootStore.withLoading( 'sync', () => this.syncService.syncToApi(), {
			showSuccess: true,
			successMessage: 'Обновление успешно проведено'
		} );
	};

	changeKey = async () => {
		try {
			await this.rootStore.withLoading( 'changeKey', () => this.syncService.changeKey(), {
				showSuccess: true,
				successMessage: 'Ключ обновлен'
			} );

			window.location.reload();
		} catch ( error ) {
			console.error( 'Ошибка при изменении ключа:', error );
		}
	};

	resetKey = async () => {

		try {
			await this.rootStore.withLoading( 'resetKey', () => this.syncService.resetKey(), {
				showSuccess: true,
				successMessage: 'Ключ сброшен'
			} );

		//	window.location.reload();
		} catch ( error ) {
			console.error( 'Ошибка при сбросе ключа:', error );
		}

	};

	getAllAdditionals = async () => {
		return this.rootStore.withLoading( 'fetchAdditionals', () => this.syncService.getAllAdditionals() );
	};
}

export default SyncStore;