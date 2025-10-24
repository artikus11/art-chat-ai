// src/config/messagePanelConfig.js

import WelcomeHelp from '../components/HelpTooltips/WelcomeHelp';
import FollowupHelp from '../components/HelpTooltips/FollowupHelp';
import ReturningHelp from '../components/HelpTooltips/ReturningHelp';
import ReconnectHelp from '../components/HelpTooltips/ReconnectHelp';
import ActiveReturnHelp from '../components/HelpTooltips/ActiveReturnHelp';

const createField = ( type, field, label, options = {} ) => ( {
	type,
	field,
	label,
	...options,
} );

export const MESSAGE_PANELS_CONFIG = {
	in: [
		{
			title: 'Первое приветствие',
			messageName: 'greeting',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 1000,
					step: 100,
					initialPosition: 600,
				} ),
			],
		},
		{
			title: 'Второе сообщение',
			messageName: 'followup',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 30000,
					step: 500,
					initialPosition: 15000,
				} ),
			],
		},
		{
			title: 'Сообщение об ошибке',
			messageName: 'fallback',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 1000,
					step: 100,
					initialPosition: 0,
				} ),
			],
		},
		{
			title: 'Ошибка (Error)',
			messageName: 'error',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 1000,
					step: 100,
					initialPosition: 0,
				} ),
			],
		},
	],

	out: [
		{
			title: 'Приветствие (Welcome)',
			messageName: 'welcome',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 10000,
					step: 500,
					initialPosition: 10000,
				} ),
				createField( 'range', 'duration', 'Длительность отображения, мс', {
					min: 0,
					max: 60000,
					step: 500,
				} ),
				createField( 'range', 'cooldownHours', 'Интервал показа сообщения, часы', {
					min: 0,
					max: 48,
					step: 1,
				} ),
				createField( 'toggle', 'disable', 'Отключить' ),
				{
					type: 'help',
					field: 'helpButton',
					title: 'Первое приветствие',
					content: WelcomeHelp,
				},
			],
		},
		{
			title: 'Напоминание (Followup)',
			messageName: 'followup',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 90000,
					step: 500,
					initialPosition: 30000,
				} ),
				createField( 'range', 'duration', 'Длительность отображения, мс', {
					min: 0,
					max: 60000,
					step: 500,
				} ),
				createField( 'range', 'cooldownHours', 'Интервал показа сообщения, часы', {
					min: 0,
					max: 48,
					step: 1,
				} ),
				createField( 'toggle', 'disable', 'Отключить' ),
				{
					type: 'help',
					field: 'helpButton',
					title: 'Напоминание после первого приветствия',
					content: FollowupHelp,
				},
			],
		},
		{
			title: 'Возврат после сессии (Returning)',
			messageName: 'returning',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 60000,
					step: 500,
					initialPosition: 10000,
				} ),
				createField( 'range', 'duration', 'Длительность отображения, мс', {
					min: 0,
					max: 60000,
					step: 500,
				} ),
				createField( 'range', 'cooldownHours', 'Интервал показа сообщения, часы', {
					min: 0,
					max: 48,
					step: 1,
				} ),
				createField( 'toggle', 'disable', 'Отключить' ),
				{
					type: 'help',
					field: 'helpButton',
					title: 'Приглашение после сессии',
					content: ReturningHelp,
				},
			],
		},
		{
			title: 'Приглашение к продолжению диалога (Reconnect)',
			messageName: 'reconnect',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 60000,
					step: 500,
					initialPosition: 8000,
				} ),
				createField( 'range', 'duration', 'Длительность отображения, мс', {
					min: 0,
					max: 60000,
					step: 500,
				} ),
				createField( 'range', 'cooldownHours', 'Интервал показа сообщения, часы', {
					min: 0,
					max: 48,
					step: 1,
				} ),
				createField( 'toggle', 'disable', 'Отключить' ),
				{
					type: 'help',
					field: 'helpButton',
					title: 'Приглашение к продолжению диалога',
					content: ReconnectHelp,
				},
			],
		},
		{
			title: 'Сообщение на возврат пользователя (Active Return)',
			messageName: 'active_return',
			fields: [
				createField( 'text', 'text', 'Текст сообщения' ),
				createField( 'range', 'delay', 'Задержка вывода, мс', {
					min: 0,
					max: 60000,
					step: 500,
					initialPosition: 5000,
				} ),
				createField( 'range', 'duration', 'Длительность отображения, мс', {
					min: 0,
					max: 60000,
					step: 500,
				} ),
				createField( 'range', 'cooldownHours', 'Интервал показа сообщения, часы', {
					min: 0,
					max: 48,
					step: 1,
				} ),
				createField( 'toggle', 'disable', 'Отключить' ),
				{
					type: 'help',
					field: 'helpButton',
					title: 'Сообщение на возврат пользователя',
					content: ActiveReturnHelp,
				},
			],
		},
	],
};