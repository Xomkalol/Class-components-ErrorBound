import { createContext } from 'react';
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});
