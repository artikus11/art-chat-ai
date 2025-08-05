/* global ChatbotSettings*/
import { makeAutoObservable, runInAction } from 'mobx';
import SettingsService from '../services/SettingsService';

class SettingsStore {
	settings = { ...ChatbotSettings.defaults };
	error = null;
	isInitialized = false;

	constructor( rootStore ) {
		this.rootStore = rootStore;

		makeAutoObservable( this );

		Promise.all( [
			this.loadSettings(),
			this.minDelay( 300 )
		] ).finally( () => {
			runInAction( () => {
				this.isInitialized = true;
			} );
		} );
	}

	minDelay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) );

	loadSettings = async () => {

		if ( ! this.rootStore || ! this.rootStore.uiStore ) {
			console.error( 'SettingsStore: rootStore или uiStore не инициализированы' );
			return;
		}

		this.rootStore.uiStore.setLoading( 'saveSettings', true );
		this.error = null;

		try {
			const savedSettings = await SettingsService.getSettings();

			runInAction( () => {
				this.settings = {
					...this.settings,
					...savedSettings,
				};
			} );

		} catch ( error ) {
			runInAction( () => {
				this.error = error.message;
			} );
		} finally {
			runInAction( () => {
				this.rootStore.uiStore.setLoading( 'saveSettings', false );
			} );
		}
	};

	getCurrentSettings() {
		return this.settings;
	}

	refreshSettings = async () => {
		try {
			const freshSettings = await SettingsService.getSettings();
			runInAction( () => {
				this.settings = { ...this.settings, ...freshSettings };
			} );
			return this.settings;
		} catch ( error ) {
			runInAction( () => {
				this.error = error.message;
			} );
			throw error;
		}
	};

	updateSetting = ( key, value ) => {
		this.settings = {
			...this.settings,
			[ key ]: value
		};
	};

	saveSettings = async () => {
		this.rootStore.uiStore.setLoading( 'saveSettings', true );

		try {
			const result = await SettingsService.saveSettings( this.settings );

			if ( result.success ) {
				return result;
			}
			return result;

		} catch ( error ) {
			return {
				success: false,
				message: error.message || 'Ошибка сети'
			};
		} finally {
			this.rootStore.uiStore.setLoading( 'saveSettings', false );
		}
	};
}

export default SettingsStore;