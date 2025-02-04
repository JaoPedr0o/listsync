import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';

import { createStyles } from './Checkbox.style';

import { useTheme } from '~/theme/themeContext';

type CustomCheckboxProps = {
  label?: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
};

const CustomCheckbox = ({ label, value, onChange }: CustomCheckboxProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const backgroundColor = new Animated.Value(value ? 1 : 0);

  Animated.timing(backgroundColor, {
    toValue: value ? 1 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.GRAY_300, '#59BF69'],
  });

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => onChange(!value)}>
      <Animated.View style={[styles.checkbox, { backgroundColor: animatedBackgroundColor }]}>
        <Ionicons name="checkmark" size={20} color={theme.MAIN} />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
