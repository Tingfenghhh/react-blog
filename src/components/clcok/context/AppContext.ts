import { createContext, useContext, Dispatch } from 'react';
import { AppAction } from './reducer';

export type AppState = {
  theme: string;
  name: string;
};

const userColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? 'dark'
  : 'light';

const initialValue: AppState = {
  theme: localStorage.getItem('theme') || userColorScheme,
  name: localStorage.getItem('name') || '',
};
const Context = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: initialValue,
  dispatch: () => undefined,
});
export const useAppContext = () => useContext(Context);
export { Context, initialValue };
