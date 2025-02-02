import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './Avatar.style';

type AvatarProps = {
  onPress?: () => void;
};

export default function Avatar(props: AvatarProps) {
  return (
    <TouchableOpacity style={styles.Container} onPress={props.onPress}>
      <FontAwesome name="bars" size={14} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
