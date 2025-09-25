import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { Flex, PanelBody, PanelRow } from '@wordpress/components';
import Grid from '../Layout/Grid';
import ToggleInput from '../Controls/ToggleInput';
import RangeInputDelay from '../Controls/RangeInputDelay';
import ClearLocalStorageButton from '../Buttons/ClearLocalStorageButton';

const GeneralPanel = observer( () => {
	const { settingsStore, uiStore } = useStores();
	const { general } = settingsStore.settings;
	const { isLoadingClearLocalStorage } = uiStore;

	return (
		<PanelBody title="Основные" initialOpen={ true }>
			<PanelBody>
				<Flex as={ 'div' } align={ 'center' }>
					<ToggleInput
						label="Включить чат"
						checked={ general.show_chat }
						onChange={ ( value ) => settingsStore.updateSetting( 'general.show_chat', value ) }
					/>

					<div className="acai-settings-row">
						<ToggleInput
							label="Включить отладку"
							checked={ general.debug }
							onChange={ ( value ) => settingsStore.updateSetting( 'general.debug', value ) }
						/>

						<ClearLocalStorageButton
							onClick={ () => uiStore.clearLocalStorageByPrefix( 'aichat:' ) }
							isLoading={ isLoadingClearLocalStorage }
						/>
					</div>


				</Flex>
			</PanelBody>


			<PanelBody>
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


		</PanelBody>
	);
} );

export default GeneralPanel;