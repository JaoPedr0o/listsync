import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStyles } from './Avatar.style';

import { useTheme } from '~/theme/themeContext';

type AvatarProps = {
  onPress?: () => void;
};

export default function Avatar(props: AvatarProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity hitSlop={35} style={styles.Container} onPress={props.onPress}>
      <FontAwesome name="bars" size={25} color={theme.SEC} />
    </TouchableOpacity>
  );
}
