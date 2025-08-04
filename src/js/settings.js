import { SlotFillProvider } from '@wordpress/components';
import { createRoot } from '@wordpress/element';
import { RootStoreProvider } from './settings/stores/RootStoreContext';
import SettingsApp from './settings/components/Layout/SettingsApp';
import domReady from '@wordpress/dom-ready';

domReady( () => {
	const root = createRoot(
		document.getElementById( 'chatbot-react-settings' )
	);

	if ( ! root ) {
		return;
	}

	root.render(
		<SlotFillProvider>
			<RootStoreProvider>
				<SettingsApp/>
			</RootStoreProvider>
		</SlotFillProvider>
	);
} );