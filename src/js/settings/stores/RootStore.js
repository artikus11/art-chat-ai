import { makeAutoObservable } from 'mobx';
import SettingsStore from './SettingsStore';
import SyncStore from './SyncStore';
import UiStore from './UiStore';

class RootStore {
	constructor() {
		this.uiStore = new UiStore( this );
		this.settingsStore = new SettingsStore( this );


		//this.sync = new SyncStore( this );

		makeAutoObservable( this, {}, { autoBind: true } );
	}
}

export default new RootStore();