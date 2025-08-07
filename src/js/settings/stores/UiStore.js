import { makeAutoObservable, runInAction } from 'mobx';

class UiStore {
	notices = [];
	loadingStates = {
		ping: false,
		fetchAdditionals: false,
		saveSettings: false,
		sync: false,
		changeKey: false,
	};

	constructor(rootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this, {}, { autoBind: true });
	}


	setLoading(key, value) {
		this.loadingStates = { ...this.loadingStates, [key]: value };
	}


	get isLoading() {
		return Object.values(this.loadingStates).some(Boolean);
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


	addNotice(type, message, duration = 5000) {
		const id = Date.now();
		this.notices.push({ id, type, message });

		setTimeout(() => this.removeNotice(id), duration);
	}

	removeNotice(id) {
		this.notices = this.notices.filter(notice => notice.id !== id);
	}

	showSuccess(message) {
		this.addNotice('success', message);
	}

	showError(message) {
		this.addNotice('error', message);
	}


	showNotification({ type = 'info', message, duration }) {
		this.addNotice(type, message, duration);
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