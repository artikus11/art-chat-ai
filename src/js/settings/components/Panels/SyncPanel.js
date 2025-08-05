import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody, PanelRow } from '@wordpress/components';
import PingButton from '../Buttons/PingButton';
import SyncButton from '../Buttons/SyncButton';
import AdditionalsButton from '../Buttons/AdditionalsButton';

const SyncPanel = observer( () => {
	const { uiStore, syncStore } = useStores();
	const { isLoadingPing, isLoadingAdditionals } = uiStore;

	return (
		<>
			<PanelBody title="Синхронизация с API" initialOpen={ true }>
				<PanelRow>
					<SyncButton
						//onClick={() => settingsStore.syncWithApi()}
					/>

					<AdditionalsButton
						onClick={() => syncStore.getAllAdditionals()}
						isLoading={isLoadingAdditionals}
					/>
					<PingButton
						onClick={() => syncStore.ping()}
						isLoading={isLoadingPing}
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
} );

export default SyncPanel;