import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './firebase';

export const logIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      await AsyncStorage.setItem(
        '@user_data',
        JSON.stringify({
          email,
          password,
          auth,
        })
      );
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
