import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import { DarkTheme, LightTheme, ThemeType } from '../theme/global.style';

import { getUserDarkModePreference } from '~/services/functions';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(LightTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemePreference = async () => {
      const darkMode = await getUserDarkModePreference();
      setTheme(darkMode ? DarkTheme : LightTheme);
      setLoading(false);
    };

    fetchThemePreference();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === LightTheme ? DarkTheme : LightTheme);
  };

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}
