import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './Avatar.style';

import { logOut } from '~/services/logout';

export default function Avatar() {
  return (
    <TouchableOpacity style={styles.Container} onPress={() => logOut()}>
      <FontAwesome name="user" size={14} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
