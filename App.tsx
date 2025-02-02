import 'react-native-gesture-handler';
import { Righteous_400Regular, useFonts } from '@expo-google-fonts/righteous';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';

import RootStack from './src/routes';

import SvgLogo from '~/assets/Logo';
import { styles } from '~/screens/Home/home.style';
import { checkUserLogin } from '~/services/loginPersistCheck';

export default function App() {
  const [fontLoader] = useFonts({ Righteous_400Regular });

  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" animated backgroundColor="white" />
      {fontLoader ? (
        <RootStack />
      ) : (
        <View style={styles.loadingContainer}>
          <SvgLogo />
        </View>
      )}
    </>
  );
}
