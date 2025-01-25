import 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import RootStack from './src/routes';

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#FFFFFF');
  }, []);
  return (
    <>
      <StatusBar barStyle={'dark-content'} animated />
      <RootStack />
    </>
  );
}
