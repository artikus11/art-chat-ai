import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { Flex, FlexBlock, FlexItem, PanelBody } from '@wordpress/components';
import ColorPickerInput from '../Controls/ColorPickerInput';
import ToggleInput from '../Controls/ToggleInput';
import TextInput from '../Controls/TextInput';
import RangeInputDelay from '../Controls/RangeInputDelay';

const AppearanceTab = observer( () => {
	const { settingsStore } = useStores();
	const { settings } = settingsStore;
	const { appearance } = settings;

	return (
		<PanelBody title="Настройки внешнего вида" initialOpen={ true }>
			<TextInput
				label="Заголовок чата"
				value={ appearance.header_chat_text || '' }
				onChange={ ( value ) => settingsStore.updateSetting( 'appearance.header_chat_text', value ) }
			/>

			<ColorPickerInput
				label="Акцентный цвет"
				color={ appearance.accent_chat_color }
				onChange={ ( color ) => settingsStore.updateSetting( 'appearance.accent_chat_color', color ) }
			/>
		</PanelBody>
	);
} );

export default AppearanceTab;