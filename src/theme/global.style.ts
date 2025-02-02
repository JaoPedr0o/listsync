export interface ThemeType {
  MAIN: string;
  SEC: string;

  GRAY_400: string;
  GRAY_300: string;
  GRAY_200: string;
  GRAY_100: string;
}

export const LightTheme: ThemeType = {
  MAIN: '#FFFFFF',
  SEC: '#121212',

  GRAY_400: '#878787',
  GRAY_300: '#E0E0E0',
  GRAY_200: '#ECEFF1',
  GRAY_100: '#F8F9FA',
};

export const DarkTheme: ThemeType = {
  MAIN: '#3A3A3E',
  SEC: '#E0E0E0',

  GRAY_400: '#B0B0B0',
  GRAY_300: '#5A5A5D',
  GRAY_200: '#6A6A6D',
  GRAY_100: '#7A7A7D',
};
