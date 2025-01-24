import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '~/services/firebase';

export const fetchUserData = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const dataRef = doc(db, 'users', user.uid);
      const dataSnap = await getDoc(dataRef);
      if (dataSnap.exists()) {
        return dataSnap.data();
      } else {
        console.log('Sem dados!');
        return null;
      }
    } else {
      console.log('Usuário não autenticado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao realizar a busca:', error);
    return null;
  }
};
