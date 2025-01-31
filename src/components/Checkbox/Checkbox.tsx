import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';

import { styles } from './Checkbox.style';

type CustomCheckboxProps = {
  label?: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
};

const CustomCheckbox = ({ label, value, onChange }: CustomCheckboxProps) => {
  const backgroundColor = new Animated.Value(value ? 1 : 0);

  Animated.timing(backgroundColor, {
    toValue: value ? 1 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#59BF69'],
  });

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => onChange(!value)}>
      <Animated.View style={[styles.checkbox, { backgroundColor: animatedBackgroundColor }]}>
        {value && <Ionicons name="checkmark" size={20} color="#FFFFFF" />}
      </Animated.View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
