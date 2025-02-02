import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: 80,
      height: 40,
      justifyContent: 'center',
    },
    switchBackground: {
      width: 80,
      height: 40,
      borderRadius: 50,
      padding: 2,
      justifyContent: 'center',
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 25,
      backgroundColor: theme.MAIN,
      position: 'absolute',
      marginLeft: 3,
      marginRight: 3,
    },
  });
