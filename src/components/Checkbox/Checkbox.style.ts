import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: theme.MAIN,
      borderRadius: 10,
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
