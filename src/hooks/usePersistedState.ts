import { useEffect, useState } from "react";

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
    if (state === initialValue) return;
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key, initialValue]);

  return [state, setState];
};

export default usePersistedState;
