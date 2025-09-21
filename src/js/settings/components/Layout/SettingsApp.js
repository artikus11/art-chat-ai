import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import {
	Panel,
	PanelBody,
	PanelRow,
	Snackbar
} from '@wordpress/components';
import ApiTab from '../Tabs/ApiTab';
import AppearanceTab from '../Tabs/AppearanceTab';
import SaveButton from '../Buttons/SaveButton';
import SettingsTabPanel from '../Tabs/TabPanel';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import GlobalModal from './GlobalModal';
import MessagesTab from '../Tabs/MessagesTab';

const SettingsApp = observer( () => {
	const { settingsStore, uiStore } = useStores();
	const { settings, saveSettings, activeTab, setActiveTab, isInitializing } = settingsStore;
	const { isSavingSettings, notices } = uiStore;


	if ( isInitializing ) {
		return <SkeletonLoader/>
	}

	return (
		<div className="acai-settings-wrapper">
			<Panel>
				<SettingsTabPanel
					activeKey={ activeTab }
					onSelect={ setActiveTab }
				>
					{ ( tab ) => (
						<>
							{ tab.name === 'api' && (
								<ApiTab
									settings={ settings }
									updateSetting={ settingsStore.updateSetting }
								/>
							) }
							{ tab.name === 'messagesIn' && (
								<MessagesTab
									group="in"
									settings={ settings }
									updateSetting={ settingsStore.updateSetting }
								/>
							) }
							{ tab.name === 'messagesOut' && (
								<MessagesTab
									group="out"
									settings={ settings }
									updateSetting={ settingsStore.updateSetting }
								/>
							) }
							{ tab.name === 'appearance' && (
								<AppearanceTab
									settings={ settings }
									updateSetting={ settingsStore.updateSetting }
								/>
							) }
						</>
					) }
				</SettingsTabPanel>

				<PanelBody>
					<PanelRow>
						<SaveButton
							onClick={ saveSettings }
							disabled={ isSavingSettings }
							isLoading={ isSavingSettings }
						/>
					</PanelRow>
				</PanelBody>
			</Panel>

			<GlobalModal />
			{ notices.map( notice => (
				<Snackbar key={ notice.id } className={ `acai-snackbar acai-snackbar--${ notice.type }` }>
					{ notice.message }
				</Snackbar>
			) ) }
		</div>
	);
} );

export default SettingsApp;