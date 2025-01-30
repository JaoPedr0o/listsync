import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';

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

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#59BF69',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default CustomCheckbox;
