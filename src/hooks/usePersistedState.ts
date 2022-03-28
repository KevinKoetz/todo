import { useEffect, useState } from "react";


/**
 * 
 * @param initialValue Initial Value of the state, this is only used if localStorage does not contain the key.
 * @param key Key under which the value is to be stored in localStorage
 * @returns [state, dispatcher]
 */
const usePersistedState = <T>(
  initialValue: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(initialValue);

  //Load State from Local Storage on first render.
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (!value) return;
    setState(JSON.parse(value));
  }, [key]);

  //Save State to Local Storage on change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key, initialValue]);

  return [state, setState];
};

export default usePersistedState;
