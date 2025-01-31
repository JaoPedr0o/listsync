import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import RootStack from './src/routes';

import { checkUserLogin } from '~/services/loginPersistCheck';

export default function App() {
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
