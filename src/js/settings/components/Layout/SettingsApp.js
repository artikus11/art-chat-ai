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

const SettingsApp = observer( () => {
	const { settingsStore, uiStore } = useStores();
	const { settings, saveSettings, activeTab, setActiveTab, isInitialized } = settingsStore;
	const { isSavingSettings, notices } = uiStore;

	if ( ! isInitialized ) {
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

			{ notices.map( notice => (
				<Snackbar key={ notice.id } className={ `acai-snackbar acai-snackbar--${ notice.type }` }>
					{ notice.message }
				</Snackbar>
			) ) }
		</div>
	);
} );

export default SettingsApp;