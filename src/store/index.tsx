import React, { useContext, createContext, useReducer } from 'react';
import { InitialStateType, ActionType } from 'interfaces';
import reducers from 'store/reducers';
import initialState from 'store/states';

interface Props {
    children: React.ReactNode
}

export const Context = createContext<[InitialStateType, React.Dispatch<ActionType>]>([initialState, () => null])

const Store: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    
    return ( 
        <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
    )
}

export const useStore = () => {
    const [state, dispatch] = useContext(Context);
    return { state, dispatch }
}

export default Store;