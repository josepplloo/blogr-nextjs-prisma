import { createContext, useContext } from 'react';

export const contextFactory = <State, Action>(initialState: State) => {
  const Context = createContext({
    state: {...initialState},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
    dispatch: (action: Action) => {},
  });

  const useSelector = (selector: (arg: State) => any) => {
    const {state} = useContext(Context);
    return selector(state);
  };

  const useDispatch = () => {
    const {dispatch} = useContext(Context);
    return dispatch;
  };

  return {useSelector, Context, useDispatch};
}
