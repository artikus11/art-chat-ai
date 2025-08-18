import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody } from '@wordpress/components';
import SelectInput from '../Controls/SelectInput';
import ColorPickerInput from '../Controls/ColorPickerInput';
import ToggleInput from '../Controls/ToggleInput';
import TextInput from '../Controls/TextInput';

const AppearanceTab = observer( () => {
	const { settingsStore } = useStores();
	const { settings } = settingsStore;

	return (
		<PanelBody title="Настройки внешнего вида" initialOpen={ true }>
			{/*<SelectInput
			 label="Расположение окна чата"
			 value={ settings.chatPosition }
			 onChange={ ( value ) => updateSetting( 'chatPosition', value ) }
			 options={ [
			 { label: 'Справа', value: 'right' },
			 { label: 'Слева', value: 'left' },
			 ] }
			 />*/ }

			<ToggleInput
				label="Включить чат"
				checked={ settings.showChat }
				onChange={ ( value ) => settingsStore.updateSetting( 'showChat', value ) }
			/>

			<TextInput
				label="Заголовок чата"
				value={ settings.headerChatText || '' }
				onChange={ ( value ) => settingsStore.updateSetting( 'headerChatText', value ) }
			/>

			<ColorPickerInput
				label="Акцентный цвет"
				color={ settings.accentChatColor }
				onChange={ ( color ) => settingsStore.updateSetting( 'accentChatColor', color ) }
			/>
		</PanelBody>
	);
} );

export default AppearanceTab;