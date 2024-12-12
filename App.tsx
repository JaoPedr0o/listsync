import 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

import RootStack from './navigation';

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#FFFFFF');
  }, []);
  return <RootStack />;
}
