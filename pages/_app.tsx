import { AppProps } from "next/app";
import { useReducer } from "react";
import { reducer, INITIAL_STATE } from "../context/reducer";
import { Context as TODOContext } from "../context";

const App = ({ Component, pageProps }: AppProps) => {
  console.log(pageProps, 'props');
  
  const [postsState, postsDispatch] = useReducer(reducer, {...INITIAL_STATE, todos: pageProps.feed });
  return (
    <TODOContext.Provider value={{ state: postsState, dispatch: postsDispatch }}>
      <Component {...pageProps} />
    </TODOContext.Provider>
  );
};

export default App;
