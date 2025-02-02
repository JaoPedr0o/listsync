import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: theme.SEC,
      borderRadius: 10,
      elevation: 5,
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      shadowColor: theme.MAIN,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6.84,
    },
    buttonText: {
      color: theme.MAIN,
      fontSize: 16,
      fontFamily: 'Righteous_400Regular',
      textAlign: 'center',
    },
  });
