import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from './menu.style';

import { logOut } from '~/services/logout';

const Menu = () => {
  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade de editar perfil');
  };

  const handleDeleteAccount = () => {
    Alert.alert('Excluir Conta', 'Funcionalidade de excluir conta');
  };

  const handleChangeTheme = () => {
    Alert.alert('Mudar Tema', 'Funcionalidade de mudar tema');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Políticas de Privacidade', 'Funcionalidade de políticas de privacidade');
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
        <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
          <FontAwesome name="user" size={14} color="#000000" />
          <Text style={styles.textBold}>Editar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <FontAwesome name="trash" size={14} color="#000000" />
          <Text style={styles.textBold}>Excluir Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleChangeTheme}>
          <FontAwesome name="toggle-on" size={14} color="#000000" />
          <Text style={styles.textBold}>Mudar de Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
          <FontAwesome name="building" size={14} color="#000000" />
          <Text style={styles.textBold}>Políticas de Privacidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <FontAwesome name="external-link" size={14} color="#000000" />
          <Text style={styles.textBold}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.vtext}>V1.0.0</Text>
      </View>
    </View>
  );
};

export default Menu;
