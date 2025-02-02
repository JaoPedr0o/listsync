import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '~/services/firebase';

export const recoveryPassword = async (email: string) => {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Erro ao enviar email de recuperação:', error);
    return null;
  }
};
