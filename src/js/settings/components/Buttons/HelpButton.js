import { Button } from '@wordpress/components';
import { useStores } from '../../stores/RootStoreContext';
import { observer } from 'mobx-react-lite';
import HtmlContent from '../Layout/HtmlContent';

const HelpButton = observer( ( { modalTitle, modalContent } ) => {
	const { uiStore } = useStores();

	const handleClick = () => {
		uiStore.openModal( {
			title: modalTitle || 'Справка',
			content: () => {
				// Если modalContent — это функция (React-компонент), рендерим её
				if ( typeof modalContent === 'function' ) {
					const ContentComponent = modalContent;
					return <ContentComponent/>;
				}
				// Иначе — строка с HTML
				return <HtmlContent html={ modalContent }/>;
			},
			actions: [],
		} );
	};

	return (
		<Button
			variant="secondary"
			onClick={ handleClick }
		>
			{ 'Справка' }
		</Button>
	);
} );

export default HelpButton;