import { PanelBody, PanelRow } from '@wordpress/components';
import { observer } from 'mobx-react-lite';
import TextInput from '../Controls/TextInput';
import TextAreaInput from '../Controls/TextAreaInput';
import SyncButton from '../Buttons/SyncButton';
import { useStores } from '../../stores/RootStoreContext';

const ApiTab = observer( () => {
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

			<PanelBody title="Синхронизация с API" initialOpen={ true }>
				<PanelRow>
					<SyncButton
						//onClick={() => settingsStore.syncWithApi()}
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
} );

export default ApiTab;