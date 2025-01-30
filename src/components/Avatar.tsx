import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { logOut } from '~/services/logout';

export default function Avatar() {
  return (
    <TouchableOpacity style={styles.Container} onPress={() => logOut()}>
      <FontAwesome name="user" size={14} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    marginRight: 15,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
});
