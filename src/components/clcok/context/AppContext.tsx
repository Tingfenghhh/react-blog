import { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import AppReducer from './reducer';
import { Context, initialValue } from './AppContext';

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialValue);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default AppContext;
