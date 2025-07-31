import { __ } from '@wordpress/i18n';
import { Text } from '@wordpress/components';

const Badge = ({ children, variant = 'default', style }) => {
	const colors = {
		default: '#74777a',
		success: '#007a5a',
		error: '#d63638',
		info: '#0066cc',
	};

	return (
		<Text
			as="span"
			size="small"
			style={{
				display: 'inline-block',
				padding: '2px 6px',
				borderRadius: '3px',
				backgroundColor: colors[variant] || colors.default,
				color: '#fff',
				fontSize: '11px',
				fontWeight: '600',
				textTransform: 'uppercase',
				...style,
			}}
		>
			{children}
		</Text>
	);
};

export default Badge;