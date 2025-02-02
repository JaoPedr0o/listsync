import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { createStyles } from './menu.style';

import { toggleUserDarkModePreference } from '~/services/functions';
import { logOut } from '~/services/logout';
import { DarkTheme, LightTheme } from '~/theme/global.style';
import { useTheme } from '~/theme/themeContext';

const Menu = () => {
  const { theme, setTheme } = useTheme();
  const styles = createStyles(theme);
  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade de editar perfil');
  };

  const handleDeleteAccount = () => {
    Alert.alert('Excluir Conta', 'Funcionalidade de excluir conta');
  };

  const handleToggleTheme = () => {
    const newTheme = theme === LightTheme ? DarkTheme : LightTheme;
    setTheme(newTheme);

    toggleUserDarkModePreference(newTheme === DarkTheme);
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Políticas de Privacidade', 'Funcionalidade de políticas de privacidade');
  };

  const handleLogout = () => {
    theme === DarkTheme && setTheme(LightTheme);
    logOut();
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
        <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
          <FontAwesome name="user" size={20} color={theme.MAIN} />
          <Text style={styles.textBold}>Editar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <FontAwesome name="trash" size={20} color={theme.MAIN} />
          <Text style={styles.textBold}>Excluir Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleToggleTheme}>
          <FontAwesome
            name={theme === DarkTheme ? 'toggle-on' : 'toggle-off'}
            size={20}
            color={theme.MAIN}
          />
          <Text style={styles.textBold}>Mudar de Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
          <FontAwesome name="building" size={20} color={theme.MAIN} />
          <Text style={styles.textBold}>Políticas de Privacidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <FontAwesome name="external-link" size={20} color={theme.MAIN} />
          <Text style={styles.textBold}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.vtext}>V1.0.0</Text>
      </View>
    </View>
  );
};

export default Menu;
