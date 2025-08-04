import { createContext, useContext } from 'react';
import RootStore from './RootStore';

const RootStoreContext = createContext(RootStore);

export const RootStoreProvider = ({ children }) => (
	<RootStoreContext.Provider value={RootStore}>
		{children}
	</RootStoreContext.Provider>
);

export const useStores = () => useContext(RootStoreContext);