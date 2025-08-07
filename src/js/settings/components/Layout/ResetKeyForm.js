import { Button, PanelRow } from '@wordpress/components';
import { useState } from '@wordpress/element';
import TextInput from '../Controls/TextInput';

const ResetKeyForm = ({ onClose, onReset }) => {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (value.trim()) {
			onReset(value); // Передаём значение наверх
			onClose();     // Закрываем модалку
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextInput
				label="Введите запасной ключ"
				value={value}
				onChange={setValue}
				required
			/>
		<PanelRow>

				<Button
					type="button"
					variant="tertiary"
					onClick={onClose}
				>
					Отмена
				</Button>
				<Button
					variant="primary"
					type="submit"
					style={{ marginLeft: '8px' }}
				>
					Сбросить
				</Button>

		</PanelRow>
		</form>
	);
};

export default ResetKeyForm;