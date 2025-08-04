import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/RootStoreContext';

export const withStores = ( WrappedComponent ) => {
	const ObserverWrappedComponent = observer( WrappedComponent ); // Сначала оборачиваем в observer

	return function WithStoresWrapper( props ) {
		const stores = useStores();
		return <ObserverWrappedComponent { ...props } stores={ stores }/>;
	};
};