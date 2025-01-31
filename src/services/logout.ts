import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';

import { auth } from '~/services/firebase';

export const logOut = async () => {
  try {
    signOut(auth);
    await AsyncStorage.removeItem('@user_data');
  } catch (error) {
    console.error('Erro ao tentar deslogar:', error);
    return null;
  }
};
