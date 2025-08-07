/* global ChatbotSettings*/
import { makeAutoObservable, runInAction } from 'mobx';
import SettingsService from '../services/SettingsService'
import SyncService from '../services/SyncService';

class SettingsStore {
	settings = { ...ChatbotSettings.defaults };
	isInitializing = false;

	constructor( rootStore ) {
		this.rootStore = rootStore;
		this.settingsService = new SettingsService();
		this.syncService = new SyncService();

		makeAutoObservable( this );
		this.initializeStore().catch(error => {
			console.error('Failed to initialize SettingsStore:', error);
		});
	}


	initializeStore = async () => {
		this.isInitializing = true;

		try {
			await Promise.all([
				this.loadSettings(),
				this.minDelay(300)
			]);

			runInAction(() => {
				this.isInitialized = true;
			});
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
				this.rootStore.uiStore.showError('Не удалось загрузить настройки');
			});
		} finally {
			runInAction(() => {
				this.isInitializing = false;
			});
		}
	};

	minDelay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) );

	loadSettings = async () => {
		try {
			const savedSettings = await this.rootStore.withLoading(
				'saveSettings',
				() => this.settingsService.getSettings()
			);
			this.updateSettings(savedSettings);
		} catch (error) {
			this.error = error.message;
		}
	};

	updateSettings = (newSettings) => {
		this.settings = {
			...this.settings,
			...newSettings
		};
	};

	updateSetting = (key, value) => {
		this.updateSettings({ [key]: value });
	};

	getCurrentSettings = () => {
		return this.settings;
	};

	refreshSettings = async () => {
		try {
			const freshSettings = await this.settingsService.getSettings();
			this.updateSettings(freshSettings);
			return this.settings;
		} catch (error) {
			this.error = error.message;
			throw error;
		}
	};

	saveSettings = async () => {
		return this.rootStore.withLoading(
			'saveSettings',
			async () => {
				const result = await this.settingsService.saveSettings(this.settings);
				await this.syncService.addAdditional();
				return result;
			},
			{
				showSuccess: true,
				successMessage: 'Настройки успешно сохранены'
			}
		);
	};

	setLoading = ( isLoading ) => {
		runInAction( () => {
			this.rootStore.uiStore.setLoading( 'saveSettings', isLoading );
		} );
	}

	setError = ( message ) => {
		runInAction( () => {
			this.error = message;
		} );
	}

	showNotification = ( type, message ) => {
		runInAction( () => {
			this.rootStore.uiStore.addNotice( type, message );
		} );
	}
}

export default SettingsStore;