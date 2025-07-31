import { SlotFillProvider, Slot, SnackbarList } from '@wordpress/components';
import SettingsStore from './settings/state/SettingsStore';
import SettingsApp from './settings/components/Layout/App';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

domReady( () => {
	const root = createRoot(
		document.getElementById( 'chatbot-react-settings' )
	);

	if ( ! root ) {
		return;
	}

	root.render(
		<SlotFillProvider>
			<SettingsStore>
				{ ( store ) => (
					<>
						<SettingsApp
							store={ store }
							activeTab={ store.state.activeTab || 'api' }
							onTabChange={ ( tab ) => store.setState( { activeTab: tab } ) }
						/>

						<Slot name="Snackbar"></Slot>
					</>
				) }
			</SettingsStore>
		</SlotFillProvider>
	);
} );