import { PanelBody } from '@wordpress/components';
import TextInput from '../Controls/TextInput';
import TextAreaInput from '../Controls/TextAreaInput';

class ApiTab extends wp.element.Component {
	render() {
		const { settings, updateSetting } = this.props;

		return (
			<PanelBody title="Настройки API" initialOpen={true}>
				<TextInput
					label="Ключ API"
					value={settings.apiKey}
					onChange={(value) => updateSetting('apiKey', value)}
				/>
				<TextAreaInput
					label="Дополнительные правила"
					value={settings.extraRules}
					onChange={(value) => updateSetting('extraRules', value)}
					help="Укажите дополнительные правила поведения чата."
				/>
			</PanelBody>
		);
	}
}

export default ApiTab;