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
			title: 'Внутренние сообщния',
			className: 'tab-messages',
		},
		{
			name: 'messagesOut',
			title: 'Внешние сообщения',
			className: 'tab-messages',
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