import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { ThemeType } from '~/theme/global.style';
import { useTheme } from '~/theme/themeContext';

const ItemSkeleton = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const animation = new Animated.Value(0);

  // Animação de pulsação para os skeletons
  Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.7],
  });

  return (
    <View style={styles.MainContainer}>
      {/* Título da lista */}
      <View style={styles.Container}>
        <View style={styles.skeletonTitle}>
          <Animated.View style={[styles.skeletonText, { opacity }]} />
        </View>

        {/* Entrada de item */}
        <View style={styles.skeletonAddItemContainer}>
          <Animated.View style={[styles.skeletonMainInput, { opacity }]} />
          <Animated.View style={[styles.skeletonInput, { opacity }]} />
          <Animated.View style={[styles.skeletonButton, { opacity }]} />
        </View>

        {/* Lista de itens */}
        <View style={styles.skeletonItemList}>
          <Animated.View style={[styles.skeletonItem, { opacity }]} />
        </View>
      </View>

      {/* Rodapé */}
      <View style={styles.skeletonFooter}>
        <View style={styles.skeletonFooterItemList}>
          <Animated.View style={[styles.skeletonFooterButton, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      justifyContent: 'space-between',
      width: '100%',
    },

    Container: {
      marginHorizontal: 15,
    },

    skeletonTitle: {
      width: '100%',
      height: 40,
      backgroundColor: theme.GRAY_400,
      borderRadius: 5,
      marginBottom: 8,
    },
    skeletonAddItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 7,
      alignItems: 'center',
      gap: 5,
    },
    skeletonInput: {
      backgroundColor: theme.GRAY_400,
      height: 50,
      paddingLeft: 20,
      paddingRight: 10,
      borderRadius: 10,
      color: theme.SEC,
      fontSize: 12,
      width: 75,
      fontWeight: 'bold',
      flex: 1,
    },

    skeletonMainInput: {
      backgroundColor: theme.GRAY_400,
      height: 50,
      borderRadius: 10,
      color: theme.SEC,
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 10,
      maxWidth: 160,
      minWidth: 160,
      fontWeight: 'bold',
      flex: 1,
    },

    skeletonButton: {
      width: 50,
      height: 50,
      backgroundColor: '#0c0c0c',
      borderRadius: 10,
    },

    skeletonFooterButton: {
      width: '100%',
      height: 60,
      backgroundColor: '#0c0c0c',
      borderRadius: 10,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },

    skeletonItemList: {
      marginBottom: 20,
    },
    skeletonItem: {
      width: '100%',
      height: 60,
      backgroundColor: theme.GRAY_400,
      borderRadius: 10,
      marginBottom: 10,
    },
    skeletonFooter: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '100%',
      bottom: 0,
      height: 80,
      zIndex: 40,
      borderTopLeftRadius: 10,
      backgroundColor: theme.MAIN,
      borderTopRightRadius: 10,
      borderRadius: 10,
      shadowColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      paddingHorizontal: 15,
    },
    skeletonFooterItemList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skeletonText: {
      height: 20,
      backgroundColor: theme.GRAY_400,
      borderRadius: 5,
    },
  });

export default ItemSkeleton;
