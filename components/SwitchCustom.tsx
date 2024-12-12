import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface CustomSwitchProps {
  isActive?: boolean;
  onToggle?: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ isActive = false, onToggle }) => {
  const [active, setActive] = useState(isActive);
  const toggleAnimation = new Animated.Value(isActive ? 1 : 0);

  const toggleSwitch = () => {
    const newValue = !active;
    setActive(newValue);

    Animated.timing(toggleAnimation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (onToggle) {
      onToggle(newValue);
    }
  };

  const interpolatedColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#BF6259', '#59BF69'],
  });

  const switchPosition = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 41],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.container} activeOpacity={0.8}>
      <Animated.View style={[styles.switchBackground, { backgroundColor: interpolatedColor }]}>
        <Animated.View style={[styles.circle, { left: switchPosition }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 60,
    justifyContent: 'center',
  },
  switchBackground: {
    width: 100,
    height: 60,
    borderRadius: 50,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    marginLeft: 3,
    marginRight: 3,
  },
});

export default CustomSwitch;
