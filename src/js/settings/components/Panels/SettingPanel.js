import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody } from '@wordpress/components';
import TextInput from '../Controls/TextInput';
import TextAreaInput from '../Controls/TextAreaInput';

const SettingsPanel = observer( () => {
	const { settingsStore } = useStores();
	const { settings } = settingsStore;

	return (
		<>
			<PanelBody title="Настройки API" initialOpen={ true }>
				<TextInput
					label="Ключ API"
					value={ settings.apiKey || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'apiKey', value ) }
				/>
				<TextAreaInput
					label="Дополнительные правила"
					value={ settings.extraRules || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'extraRules', value ) }
					help="Укажите дополнительные правила поведения чата. Одна строка = одно знание. Разделять строки требуется клавишей ENTER (\n каретка переноса). Можно поставить комментарий используя в начале новой строки символы //. Эти комментарии не будут идти в смысловую нагрузку бота."
				/>
			</PanelBody>
		</>
	);
} );

export default SettingsPanel;