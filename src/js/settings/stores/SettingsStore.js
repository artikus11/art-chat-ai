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

		this.rootStore.uiStore.setLoading( true )
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
				this.rootStore.uiStore.setLoading( false );
			} );
		}
	};

	updateSetting = ( key, value ) => {
		this.settings = {
			...this.settings,
			[ key ]: value
		};
	};

	saveSettings = async () => {
		this.rootStore.uiStore.setSaving( true );

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
			this.rootStore.uiStore.setSaving( false );
		}
	};
}

export default SettingsStore;