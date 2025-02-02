import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    Container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      marginRight: 15,
      backgroundColor: '#FFFFFF00',
      borderRadius: 10,
    },
  });
