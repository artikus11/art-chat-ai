import { makeAutoObservable, runInAction } from 'mobx';
import apiFetch from '@wordpress/api-fetch';

class SyncStore {
	isSyncing = false;
	progress = 0;

	startSync = async () => {
		this.isSyncing = true;
		try {
			await SettingsService.syncToChatbot();
		} finally {
			this.isSyncing = false;
		}
	};

	ping = async () =>{
		this.isSyncing = true;

		try {
			await Sy;
		} finally {
			this.isSyncing = false;
		}
	};
}

export default SyncStore;