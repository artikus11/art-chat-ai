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
		sync: false,
	};

	constructor( rootStore ) {
		this.rootStore = rootStore;

		makeAutoObservable( this );
	}

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

	get isSavingSettings() {
		return this.loadingStates.saveSettings;
	}

	get isSyncing() {
		return this.loadingStates.sync;
	}

	setSaving = ( state ) => {
		this.isSaving = state;
	};

	setSyncing = ( state ) => {
		this.isSyncing = state;
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