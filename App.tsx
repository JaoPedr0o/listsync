import 'react-native-gesture-handler';
import { useFonts } from '@expo-google-fonts/righteous';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import RootStack from './src/routes';

import { checkUserLogin } from '~/services/loginPersistCheck';

export default function App() {
  useFonts({
    Righteous_400Regular: require('./src/assets/fonts/Righteous-Regular.ttf'),
  });
  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" animated backgroundColor="white" />
      <RootStack />
    </>
  );
}
