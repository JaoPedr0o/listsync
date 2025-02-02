import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './password.style';

import SvgLock from '~/assets/SvgLock';
import { toastConfig } from '~/components/Toast/Toast';
import { recoveryPassword } from '~/services/RecoveryPassword';

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    if (!email) {
      Toast.show({
        type: 'info',
        text1: 'Preecha o campo!',
        visibilityTime: 1000,
        text2: 'Coloque seu email para recuperar.',
      });
      return;
    }
    recoveryPassword(email);
    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      visibilityTime: 1000,
      text2: 'Email de recuperação enviado.',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Toast config={toastConfig} />
      <View style={styles.svgLockContainer}>
        <SvgLock />
      </View>
      <View style={styles.FormInput}>
        <TextInput
          style={styles.LoginInput}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#000000"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={handlePasswordRecovery}>
        <Text style={styles.ButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordRecoveryScreen;
