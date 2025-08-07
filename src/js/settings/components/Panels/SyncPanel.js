import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody, PanelRow } from '@wordpress/components';
import PingButton from '../Buttons/PingButton';
import SyncButton from '../Buttons/SyncButton';
import AdditionalsButton from '../Buttons/AdditionalsButton';
import ChangeKeyButton from '../Buttons/ChangeKeyButton';

const SyncPanel = observer( () => {
	const { uiStore, syncStore } = useStores();
	const { isLoadingPing, isSyncing, isChangingKey } = uiStore;

	return (
		<>
			<PanelBody title="Синхронизация с API" initialOpen={ true }>
				<PanelRow>
					<SyncButton
						onClick={ () => syncStore.sync() }
						isLoading={ isSyncing }
					/>

					{/*<AdditionalsButton
					 onClick={() => syncStore.getAllAdditionals()}
					 isLoading={isLoadingAdditionals}
					 />*/ }
					<div className="acai-settings-row">
						<ChangeKeyButton
							onClick={ () => syncStore.changeKey() }
							isLoading={ isChangingKey }
						/>
						<PingButton
							onClick={ () => syncStore.ping() }
							isLoading={ isLoadingPing }
						/>
					</div>

				</PanelRow>
			</PanelBody>
		</>
	);
} );

export default SyncPanel;