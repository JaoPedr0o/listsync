import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: theme.MAIN,
      height: '100%',
    },

    Container: {
      flex: 1,
      padding: 15,
      paddingBottom: 0,
      paddingTop: 0,
      backgroundColor: theme.MAIN,
      height: '100%',
    },

    menuItem: {
      flexDirection: 'row',
      height: 70,
      alignItems: 'center',
      gap: 10,
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    textBold: {
      fontSize: 16,
      color: theme.MAIN,
      fontFamily: 'Righteous_400Regular',
    },

    vtext: {
      position: 'absolute',
      fontFamily: 'Righteous_400Regular',
      fontSize: 10,
      color: theme.SEC,
      padding: 15,
      right: 0,
      bottom: 0,
    },
  });
