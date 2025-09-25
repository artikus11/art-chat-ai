import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody } from '@wordpress/components';
import MessagePanel from '../Panels/MessagePanel';
import { MESSAGE_PANELS_CONFIG } from '../../config/messagePanelConfig';

const MessagesTab = observer( ( { group } ) => {
	const { settingsStore } = useStores();
	const { messages } = settingsStore.settings;
	const panels = MESSAGE_PANELS_CONFIG[ group ] || [];

	return (
		<div>
			{ panels.map( ( panel ) => {
				const message = messages[ group ]?.[ panel.messageName ];

				if ( ! message ) {
					return null;
				}

				return (
					<PanelBody key={ panel.messageName } title={ panel.title } initialOpen={ true }>
						<MessagePanel
							fields={ panel.fields }
							values={ message }
							onChange={ ( field, value ) => {
								settingsStore.updateSetting(
									`messages.${ group }.${ panel.messageName }.${ field }`,
									value
								);
							} }
						/>
					</PanelBody>
				);
			} ) }
		</div>
	);
} );

export default MessagesTab;