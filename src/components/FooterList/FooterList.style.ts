import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    Container: {
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      width: '100%',
      bottom: 0,
      height: 80,
      zIndex: 40,
      borderTopLeftRadius: 10,
      backgroundColor: theme.MAIN,
      borderTopRightRadius: 10,
      shadowColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    WrapperFooterItemList: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    WrapperText: {
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    },

    ActiveText: {
      color: '#59BF69',
      fontSize: 14,
      fontFamily: 'Righteous_400Regular',
    },

    InativeText: {
      color: theme.GRAY_400,
      fontFamily: 'Righteous_400Regular',
      fontSize: 14,
    },

    TextBold: {
      fontSize: 20,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    SmalltextBold: {
      fontSize: 12,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    GrayTextBold: {
      fontSize: 14,
      color: theme.GRAY_400,
      fontFamily: 'Righteous_400Regular',
    },

    ActionButton: {
      alignItems: 'center',
      backgroundColor: theme.SEC,
      borderRadius: 10,
      elevation: 5,
      height: 40,
      width: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },

    ActionDeleteButton: {
      alignItems: 'center',
      backgroundColor: '#F44336',
      borderRadius: 10,
      elevation: 5,
      height: 40,
      width: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },

    WrapperButtons: {
      flexDirection: 'row',
      gap: 5,
    },
  });
