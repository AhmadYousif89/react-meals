import { useCallback, useReducer } from 'react';

const httpRequestState = {
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};
const httpReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: action.value };
    case 'SUCCESS':
      return { ...state, isSuccess: action.value };
    case 'ERROR':
      return { ...state, error: action.value };
    default:
      return httpRequestState;
  }
};

const useHttpRequest = () => {
  const [state, dispatch] = useReducer(httpReducer, httpRequestState);

  const sendRequest = useCallback(
    async (url, options, setData = val => val) => {
      dispatch({ type: 'LOADING', value: true });
      try {
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: options.headers || {},
          body: JSON.stringify(options.body) || null,
        });
        if (!response.ok) {
          dispatch({ type: 'ERROR', value: true });
          dispatch({ type: 'LOADING', value: false });
          throw new Error(`Request Failed ! ${response.statusText}`);
        }
        const data = await response.json();
        if (data) {
          setData(data);
          dispatch({ type: 'SUCCESS', value: true });
        }
      } catch (error) {
        dispatch({
          type: 'ERROR',
          value: error.message || 'Somthing went wrong!',
        });
      }
      dispatch({ type: 'LOADING', value: false });
    },
    [],
  );

  return {
    error: state.error,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    sendRequest,
  };
};

export default useHttpRequest;
