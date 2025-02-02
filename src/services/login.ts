import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './firebase';
import { getUserDarkModePreference } from './functions';

import { DarkTheme, LightTheme } from '~/theme/global.style';

export const logIn = async (email: string, password: string, setTheme: Function) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Após o login bem-sucedido, armazene os dados do usuário
    await AsyncStorage.setItem(
      '@user_data',
      JSON.stringify({
        email,
        password,
        auth,
      })
    );

    // Buscar a preferência de tema do usuário no banco de dados ou no Firestore
    const mode = await getUserDarkModePreference(); // true para DarkMode, false para LightMode

    // Defina o tema baseado na preferência do usuário
    if (mode) {
      setTheme(DarkTheme);
    } else {
      setTheme(LightTheme);
    }
  } catch (error) {
    const errorMessage = error;
    console.log('Erro ao fazer login:', errorMessage);
  }
};
