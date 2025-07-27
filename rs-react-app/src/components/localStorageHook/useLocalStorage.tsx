import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: string = '') => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      return savedValue || initialValue;
    }
    return initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
