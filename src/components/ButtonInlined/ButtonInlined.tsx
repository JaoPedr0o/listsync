import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { createStyles } from './ButtonInlined.style';

import { useTheme } from '~/theme/themeContext';

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const ButtonInlined = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, touchableProps.style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});
