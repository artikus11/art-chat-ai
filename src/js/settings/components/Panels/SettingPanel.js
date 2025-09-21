import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody } from '@wordpress/components';
import TextInput from '../Controls/TextInput';
import TextAreaInput from '../Controls/TextAreaInput';
import Grid from '../Layout/Grid';

const SettingsPanel = observer( () => {
	const { settingsStore } = useStores();
	const { settings } = settingsStore;
	const { api } = settings;

	return (
		<PanelBody title="Настройки API" initialOpen={ true }>
			<Grid columns={ 2 } rows={ 2 }>
				<TextInput
					label="Ключ API"
					value={ api.api_key || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'api.api_key', value ) }
				/>

				<TextInput
					label="Домен"
					value={ api.domain || '' }
					onChange={ ( value ) => settingsStore.updateSetting( 'api.domain', value ) }
				/>
			</Grid>

			<TextInput
				label="ссылка API"
				value={ api.url || '' }
				onChange={ ( value ) => settingsStore.updateSetting( 'api.url', value ) }
			/>

			<TextAreaInput
				label="Дополнительные правила"
				value={ api.extra_rules || '' }
				onChange={ ( value ) => settingsStore.updateSetting( 'api.extra_rules', value ) }
				help="Укажите дополнительные правила поведения чата. Одна строка = одно знание. Разделять строки требуется клавишей ENTER (\n каретка переноса). Можно поставить комментарий используя в начале новой строки символы //. Эти комментарии не будут идти в смысловую нагрузку бота."
			/>
		</PanelBody>
	);
} );

export default SettingsPanel;