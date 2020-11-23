import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const multiThemes = {
  light: {
    colors: {
      primary: '#0070f3',
    },
  },
  dark: {
    colors: {
      primary: '#ffffff',
    },
  },
};

export const MULTI_THEME_KEY = 'MULTI_THEME';
export const DEFAULT_THEME_NAME = 'light';

export function isValidTheme(themeName) {
  return themeName && multiThemes[themeName];
}

export function getTheme(themeName) {
  const validThemeName = isValidTheme(themeName) ? themeName : DEFAULT_THEME_NAME;
  const theme = {
    name: themeName,
    ...multiThemes[validThemeName],
    ...multiThemes,
  };
  return theme;
}


export function useTheme() {
  return useContext(ThemeContext);
}
