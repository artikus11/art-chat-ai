import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody, PanelRow } from '@wordpress/components';
import Grid from '../Layout/Grid';
import ToggleInput from '../Controls/ToggleInput';
import RangeInputDelay from '../Controls/RangeInputDelay';

const GeneralPanel = observer( () => {
	const { settingsStore } = useStores();
	const { general } = settingsStore.settings;

	return (
		<PanelBody title="Основные" initialOpen={ true }>

			<PanelRow>
				<ToggleInput
					label="Включить чат"
					checked={ general.show_chat }
					onChange={ ( value ) => settingsStore.updateSetting( 'general.show_chat', value ) }
				/>

				<ToggleInput
					label="Включить отладку"
					checked={ general.debug }
					onChange={ ( value ) => settingsStore.updateSetting( 'general.debug', value ) }
				/>

			</PanelRow>
			<Grid columns={ 2 } rows={ 1 }>
				<RangeInputDelay
					label="Активация чата, мс"
					help="Задержка активации диалогового окна чата. При установке 0, автоматической активации не будет"
					value={ general.chat_show_delay || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'general.chat_show_delay', value ) }
					min={ 0 }
					max={ 10000 }
					step={ 100 }
					initialPosition={ 0 }
				/>
				<RangeInputDelay
					label="Активация кнопки чата, мс"
					help="Задержка кнопки активации чата. При установке 0, задержки загрудки не будет"
					value={ general.toggle_show_delay || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'general.toggle_show_delay', value ) }
					min={ 0 }
					max={ 5000 }
					step={ 100 }
					initialPosition={ 0 }
				/>
			</Grid>

		</PanelBody>
	);
} );

export default GeneralPanel;