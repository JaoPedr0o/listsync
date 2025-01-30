import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './login.style';

import SvgLogo from '~/assets/Logo';
import { Button } from '~/components/Button';
import { ButtonInlined } from '~/components/ButtonInlined';
import { toastConfig } from '~/components/Toast';
import { auth } from '~/services/firebase';

export default function Login({ navigation }: { navigation: any }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function validateInputs() {
    if (email.length === 0 || password.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Campos Obrigatórios!',
        text2: 'Por favor, preencha os campos.',
      });
      return false;
    }
    return true;
  }

  function login() {
    if (!validateInputs()) return;

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        Toast.show({
          type: 'error',
          text1: 'Erro ao Logar!',
          text2: 'Erro:' + errorMessage,
        });
      });
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <SvgLogo />
        <Text style={styles.LargeTextBlack}>OLÁ!</Text>
        <Text style={styles.SmallTextBlack}>
          Bem-vindo de volta! Entre com sua conta para acessar suas listas de compras.{' '}
        </Text>
        {loading && <ActivityIndicator style={styles.ActiveIndicator} size="large" color="#000" />}
      </View>
      <View style={styles.FormInput}>
        <TextInput
          style={styles.LoginInput}
          placeholderTextColor="#000"
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail:"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.LoginInput}
          placeholderTextColor="#000"
          onChangeText={setPassword}
          value={password}
          placeholder="Senha:"
          secureTextEntry
        />
        <Text style={styles.CenteredSmallTextBlack}>Esqueci minha Senha</Text>
        <Button title="ENTRAR" onPress={login} />
        <Text style={styles.SmallTextPurple}>Ainda não possui uma conta?</Text>
        <ButtonInlined title="CRIAR CONTA" onPress={() => navigation.navigate('Login')} />
      </View>
      <Toast config={toastConfig} />
    </View>
  );
}
