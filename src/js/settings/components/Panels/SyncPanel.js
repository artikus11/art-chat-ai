import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody, PanelRow } from '@wordpress/components';
import PingButton from '../Buttons/PingButton';
import SyncButton from '../Buttons/SyncButton';
import ChangeKeyButton from '../Buttons/ChangeKeyButton';
import ResetKeyButton from '../Buttons/ResetKeyButton';

const SyncPanel = observer( () => {
	const { uiStore, syncStore } = useStores();
	const { isLoadingPing, isSyncing, isChangingKey } = uiStore;

	return (
		<PanelBody title="Синхронизация с API" initialOpen={ true }>
			<PanelRow>
				<SyncButton
					onClick={ () => syncStore.sync() }
					isLoading={ isSyncing }
				/>

				<div className="acai-settings-row">
					<ResetKeyButton/>
					{/*<ChangeKeyButton />*/ }
					<PingButton
						onClick={ () => syncStore.ping() }
						isLoading={ isLoadingPing }
					/>
				</div>

			</PanelRow>
		</PanelBody>
	);
} );

export default SyncPanel;