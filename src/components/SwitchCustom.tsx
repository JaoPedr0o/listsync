import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface CustomSwitchProps {
  isActive?: boolean;
  onToggle?: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ isActive = false, onToggle }) => {
  const [active, setActive] = useState(isActive);
  const toggleAnimation = new Animated.Value(isActive ? 1 : 0);

  useEffect(() => {
    // Sincronizando o estado interno 'active' com a prop 'isActive' sempre que ela mudar
    if (isActive !== active) {
      setActive(isActive);
      Animated.timing(toggleAnimation, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isActive]); // Reage a mudanças na prop isActive

  const toggleSwitch = () => {
    const newValue = !active;
    setActive(newValue);

    Animated.timing(toggleAnimation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Passa o novo valor para o pai, se a função onToggle for fornecida
    if (onToggle) {
      onToggle(newValue);
    }
  };

  const interpolatedColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#878787', '#59BF69'],
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
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    marginLeft: 3,
    marginRight: 3,
  },
});

export default CustomSwitch;
