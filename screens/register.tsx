import { Button } from 'components/Button';
import { ButtonInlined } from 'components/ButtonInlined';
import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, ImageBackground } from 'react-native';

export default function Register({ navigation }: { navigation: any }) {
  return (
    <View style={styles.mainContainer}>
      <View>
        <ImageBackground style={styles.LogoImage} source={require('../src/assets/logo.png')} />
        <Text style={styles.LargeTextBlack}>BEM VINDO!</Text>
        <Text style={styles.SmallTextBlack}>
          Coloque seus dados e comece agora mesmo a facilitar a seu dia a dia com essa ferramenta
          simples e poderosa.{' '}
        </Text>
      </View>
      <View style={styles.FormInput}>
        <TextInput style={styles.LoginInput} placeholderTextColor="#000" placeholder="E-mail" />
        <TextInput style={styles.LoginInput} placeholderTextColor="#000" placeholder="Senha:" />
        <Text style={styles.CenteredSmallTextBlack}>Esqueci minha Senha</Text>
        <Button title="REGISTRAR" onPress={() => navigation.navigate('DrawerNavigator')} />
        <Text style={styles.SmallTextPurple}>Ainda não possui uma conta?</Text>
        <ButtonInlined title="ENTRAR NA CONTA" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'space-between',
  },

  Container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },

  LargeTextBlack: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  SmallTextBlack: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'justify',
  },

  CenteredSmallTextBlack: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  SmallTextGreen: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#59BF69',
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
    width: '80%',
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

  InfoContent: {
    textAlign: 'center',
  },

  WhiteButton: {},
});
