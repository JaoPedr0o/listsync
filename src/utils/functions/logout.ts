import { signOut } from 'firebase/auth';

import { auth } from '~/services/firebase';

export const logOut = async () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error('Erro ao tentar deslogar:', error);
    return null;
  }
};
