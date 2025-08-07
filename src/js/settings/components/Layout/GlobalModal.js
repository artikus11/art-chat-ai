import { Modal as WPModal, Button } from '@wordpress/components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/RootStoreContext';

const GlobalModal = observer( () => {
	const { uiStore } = useStores();
	const { modal } = uiStore;

	if ( ! uiStore.isModalOpen ) {
		return null;
	}


	const { title, content: Content, actions, size } = modal;

	const renderContent = () => {
		if (typeof Content === 'function') {
			return Content();
		}
		return Content;
	};


	// Рендер кнопок
	const renderActions = () => {
		if ( actions ) {
			return actions.map( ( action, idx ) => (
				<Button
					key={ idx }
					variant={ action.variant || 'secondary' }
					onClick={ action.onClick }
					disabled={ action.disabled }
				>
					{ action.label }
				</Button>
			) );
		}

		return (
			<>
				<Button variant="tertiary" onClick={ uiStore.closeModal }>
					Отмена
				</Button>
				<Button variant="primary" onClick={ uiStore.closeModal }>
					ОК
				</Button>
			</>
		);
	};

	return (
		<WPModal
			title={ title }
			onRequestClose={ uiStore.closeModal }
			size={ size }
			// Опционально: кастомный класс
			overlayClassName={ `modal-size-${ size }` }
		>
			<div className="modal-content" style={ { marginBottom: '16px' } }>
				{ renderContent() }
			</div>

			<div className="modal-actions" style={ { textAlign: 'right' } }>
				{ renderActions() }
			</div>
		</WPModal>
	);
} );

export default GlobalModal;