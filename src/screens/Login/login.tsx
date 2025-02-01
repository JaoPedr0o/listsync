import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './login.style';

import SvgLogo from '~/assets/Logo';
import { Button } from '~/components/Button/Button';
import { ButtonInlined } from '~/components/ButtonInlined/ButtonInlined';
import { toastConfig } from '~/components/Toast/Toast';
import { logIn } from '~/services/login';

export default function Login({ navigation }: { navigation: any }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function autoFillData() {
    const userData = await AsyncStorage.getItem('@user_data');

    if (userData) {
      const { email, password } = JSON.parse(userData);

      setEmail(email);
      setPassword(password);
    }
  }

  function validateInputs() {
    if (email.length === 0 || password.length === 0) {
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: 'Campos Obrigatórios!',
          text2: 'Por favor, preencha os campos.',
        });
      }, 300);
      return false;
    }
    return true;
  }

  async function login() {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      await logIn(email, password);
    } catch (error) {
      const errorMessage = error;
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao Logar!',
          text2: 'Erro: ' + errorMessage,
        });
      }, 300);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    autoFillData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
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
