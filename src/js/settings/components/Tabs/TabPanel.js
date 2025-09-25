import { TabPanel } from '@wordpress/components';

const SettingsTabPanel = ( { activeKey, onSelect, children } ) => {
	const tabs = [
		{
			name: 'api',
			title: 'Основные настройки',
			className: 'tab-api',
		},
		{
			name: 'messagesIn',
			title: 'Внутренние сообщения',
			className: 'tab-messages-in',
		},
		{
			name: 'messagesOut',
			title: 'Внешние сообщения',
			className: 'tab-messages-out',
		},
		{
			name: 'appearance',
			title: 'Внешний вид',
			className: 'tab-appearance',
		},
	];

	return (
		<TabPanel
			tabs={ tabs }
			activeClass="is-active"
			activeName={ activeKey }
			onSelect={ onSelect }
		>
			{ children }
		</TabPanel>
	);
};

export default SettingsTabPanel;