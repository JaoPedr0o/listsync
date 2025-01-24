import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, ActivityIndicator } from 'react-native';

import SvgLogo from '~/assets/Logo';
import { Button } from '~/components/Button';
import { ButtonInlined } from '~/components/ButtonInlined';
import { auth, db } from '~/services/firebase';

export default function Register({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function validateInputs() {
    if (name.length === 0 || email.length === 0) {
      Alert.alert('Preencha todos os campos!');
      return false;
    }

    if (name.length <= 4) {
      Alert.alert('Nome muito curto! O nome deve ter mais de 4 caracteres.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (confirmPassword !== password) {
      Alert.alert('As senhas não batem!');
      return false;
    }

    return true;
  }

  function register() {
    if (!validateInputs()) return;

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          displayName: name,
          userEmail: email,
          conections: [],
          lists: [],
          profileImg: '',
        });

        setLoading(false);
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');

        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('PrivateRoutes');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Erro ao criar conta', error.message);
      });
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <SvgLogo />
        <Text style={styles.LargeTextBlack}>SEJA BEM VINDO!</Text>
        <Text style={styles.SmallTextBlack}>
          Coloque seus dados e comece agora mesmo a facilitar o seu dia a dia com essa ferramenta
          simples e poderosa.{' '}
        </Text>
        {loading && <ActivityIndicator style={styles.ActiveIndicator} size="large" color="#000" />}
      </View>
      <View style={styles.FormInput}>
        <TextInput
          style={styles.LoginInput}
          placeholderTextColor="#000"
          onChangeText={setName}
          value={name}
          placeholder="Seu nome:"
        />
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
        <TextInput
          style={styles.LoginInput}
          placeholderTextColor="#000"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirme sua Senha:"
          secureTextEntry
        />
        <Button title="REGISTRAR" onPress={register} />
        <Text style={styles.SmallTextPurple}>Já possui uma conta?</Text>
        <ButtonInlined title="ENTRAR NA CONTA" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: 40,
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'space-between',
  },

  LargeTextBlack: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },

  SmallTextBlack: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'justify',
  },

  SmallTextPurple: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6C59BF',
    textAlign: 'center',
  },

  LogoImage: {
    width: '95%',
    height: 60,
    marginVertical: 25,
  },

  FormInput: {
    width: '100%',
    marginBottom: 20,
    gap: 20,
  },

  LoginInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },

  ActiveIndicator: {
    marginTop: 30,
  },
});
