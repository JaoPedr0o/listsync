import AsyncStorage from '@react-native-async-storage/async-storage';

import { logIn } from './login';

export const checkUserLogin = async () => {
  try {
    const userData = await AsyncStorage.getItem('@user_data');

    if (userData) {
      const { email, password } = JSON.parse(userData);

      await logIn(email, password);
    }
  } catch (error) {
    console.error('Erro ao tentar login automático:', error);
  }
  return null;
};
