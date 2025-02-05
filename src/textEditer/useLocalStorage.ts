import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Try to retrieve the value from localStorage, or fall back to the initial value
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // State to manage the value
  const [storedValueState, setStoredValueState] = useState<T>(parsedValue);

  const setValue = (value: T) => {
    setStoredValueState(value);
    // Save to localStorage whenever the value changes
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValueState, setValue] as const;
}
