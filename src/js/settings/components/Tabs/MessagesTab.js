import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';
import { PanelBody } from '@wordpress/components';
import MessagePanel from '../Panels/MessagePanel';

const MessagesTab = observer( ( { group } ) => {
	const { settingsStore } = useStores();
	const { messages } = settingsStore.settings;

	const getPanelsForGroup = () => {
		switch ( group ) {
			case 'in':
				return [
					{
						title: 'Первое приветствие',
						messageName: 'greeting',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 1000,
								step: 100,
								initialPosition: 600,
							},
						],
					},
					{
						title: 'Второе сообщение',
						messageName: 'followup',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 30000,
								step: 500,
								initialPosition: 15000,
							},
						],
					},
					{
						title: 'Сообщение об ошибке',
						messageName: 'fallback',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 1000,
								step: 100,
								initialPosition: 0,
							},
						],
					},
					{
						title: 'Ошибка (Error)',
						messageName: 'error',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 1000,
								step: 100,
								initialPosition: 0,
							},
						],
					},
				];
			case 'out':
				return [
					{
						title: 'Приветствие при возвращении (Welcome)',
						messageName: 'welcome',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 10000,
								step: 500,
								initialPosition: 10000,
							},
							{
								type: 'range',
								field: 'duration',
								label: 'Длительность отображения, мс',
								min: 0,
								max: 10000,
								step: 500,
							},
							{
								type: 'range',
								field: 'cooldownHours',
								label: 'Кулдаун, часы',
								min: 0,
								max: 48,
								step: 1,
							},
							{
								type: 'toggle',
								field: 'disable',
								label: 'Отключить',
							},
						],
					},
					{
						title: 'Напоминание (Followup)',
						messageName: 'followup',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 30000,
								step: 500,
								initialPosition: 30000,
							},
							{
								type: 'range',
								field: 'duration',
								label: 'Длительность отображения, мс',
								min: 0,
								max: 10000,
								step: 500,
							},
							{
								type: 'range',
								field: 'cooldownHours',
								label: 'Кулдаун, часы',
								min: 0,
								max: 48,
								step: 1,
							},
							{
								type: 'toggle',
								field: 'disable',
								label: 'Отключить',
							},
						],
					},
					{
						title: 'Возврат после сессии (Returning)',
						messageName: 'returning',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 10000,
								step: 500,
								initialPosition: 10000,
							},
							{
								type: 'range',
								field: 'duration',
								label: 'Длительность отображения, мс',
								min: 0,
								max: 10000,
								step: 500,
							},
							{
								type: 'range',
								field: 'cooldownHours',
								label: 'Кулдаун, часы',
								min: 0,
								max: 48,
								step: 1,
							},
							{
								type: 'toggle',
								field: 'disable',
								label: 'Отключить',
							},
						],
					},
					{
						title: 'Повторное подключение (Reconnect)',
						messageName: 'reconnect',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 8000,
								step: 500,
								initialPosition: 8000,
							},
							{
								type: 'range',
								field: 'duration',
								label: 'Длительность отображения, мс',
								min: 0,
								max: 10000,
								step: 500,
							},
							{
								type: 'range',
								field: 'cooldownHours',
								label: 'Кулдаун, часы',
								min: 0,
								max: 48,
								step: 1,
							},
							{
								type: 'toggle',
								field: 'disable',
								label: 'Отключить',
							},
						],
					},
					{
						title: 'Активный возврат (Active Return)',
						messageName: 'active_return',
						fields: [
							{
								type: 'text',
								field: 'text',
								label: 'Текст сообщения',
							},
							{
								type: 'range',
								field: 'delay',
								label: 'Задержка вывода, мс',
								min: 0,
								max: 5000,
								step: 500,
								initialPosition: 5000,
							},
							{
								type: 'range',
								field: 'duration',
								label: 'Длительность отображения, мс',
								min: 0,
								max: 7000,
								step: 500,
							},
							{
								type: 'range',
								field: 'cooldownHours',
								label: 'Кулдаун, часы',
								min: 0,
								max: 48,
								step: 1,
							},
							{
								type: 'toggle',
								field: 'disable',
								label: 'Отключить',
							},
						],
					},
				];
			default:
				return [];
		}
	};

	const panels = getPanelsForGroup();

	return (
		<>
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
		</>
	);
} );

export default MessagesTab;