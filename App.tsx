import 'react-native-gesture-handler';
import { Righteous_400Regular, useFonts } from '@expo-google-fonts/righteous';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';

import RootStack from './src/routes';

import SvgLogo from '~/assets/Logo';
import { checkUserLogin } from '~/services/loginPersistCheck';
import { DarkTheme } from '~/theme/global.style';
import { ThemeProvider, useTheme } from '~/theme/themeContext';

function MainApp() {
  const { theme, setTheme } = useTheme();
  const [fontLoader] = useFonts({ Righteous_400Regular });

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.MAIN);
    NavigationBar.setButtonStyleAsync(theme === DarkTheme ? 'light' : 'dark');
  }, [theme]);

  useEffect(() => {
    checkUserLogin(setTheme);
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme === DarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.MAIN}
      />
      {fontLoader ? (
        <RootStack />
      ) : (
        <View>
          <SvgLogo />
        </View>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
