import { useState, type ReactNode } from 'react';
import { themeContext } from './context';

export const ThemeProvider = (themeProps: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {themeProps.children}
    </themeContext.Provider>
  );
};
