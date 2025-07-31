import { Component } from '@wordpress/element';
import SettingsService from '../services/SettingsService';

class SettingsStore extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			settings: { ...ChatbotSettings.defaults },
			isLoading: true,
			isSaving: false,
			notice: null,
		};
	}

	componentDidMount() {
		this.loadSettings();
	}

	loadSettings = async () => {
		try {
			const saved = await SettingsService.getSettings();
			this.setState( {
				settings: { ...this.state.settings, ...saved },
				isLoading: false,
			} );
		} catch ( error ) {
			this.setNotice( 'error', 'Не удалось загрузить настройки.' );
		}
	};

	updateSetting = ( key, value ) => {
		this.setState( {
			settings: { ...this.state.settings, [ key ]: value },
		} );
	};

	saveSettings = async () => {
		this.setState( { isSaving: true } );

		try {
			const result = await SettingsService.saveSettings(this.state.settings);
			this.setNotice(result.success ? 'success' : 'error', result.message);
		} finally {
			this.setState({ isSaving: false });
		}

	};

	setNotice = ( status, message ) => {
		this.setState( { notice: { status, message } } );
		setTimeout( () => {
			this.setState( { notice: null } );
		}, 5000 );
	};

	render() {
		return this.props.children( this );
	}
}

export default SettingsStore;