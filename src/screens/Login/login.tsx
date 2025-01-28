import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';

import { styles } from './login.style';

import SvgLogo from '~/assets/Logo';
import { Button } from '~/components/Button';
import { ButtonInlined } from '~/components/ButtonInlined';
import { auth } from '~/services/firebase';

export default function Login({ navigation }: { navigation: any }) {
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('joaopedromp15@outlook.com');
  const [loading, setLoading] = useState(false);

  // Função para validar os campos de login
  function validateInputs() {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Preencha os campos!');
      return false;
    }
    return true;
  }

  // Função para fazer login
  function login() {
    if (!validateInputs()) return;

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
        navigation.navigate('PrivateRoutes');
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        Alert.alert('Erro ao logar', errorMessage);
      });
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <SvgLogo />
        <Text style={styles.LargeTextBlack}>OLÁ!</Text>
        <Text style={styles.SmallTextBlack}>
          Entre em sua conta ou <Text style={styles.SmallTextGreen}>CLIQUE AQUI</Text> para
          continuar sem cadastro.{' '}
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
    </View>
  );
}
