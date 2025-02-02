import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    Container: {
      height: 60,
      width: '99%',
      alignSelf: 'center',
      backgroundColor: theme.GRAY_300,
      borderRadius: 10,
      flexDirection: 'row',
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,

      shadowColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    TextBold: {
      fontSize: 16,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
      flex: 1,
    },

    ItemEditButton: {
      backgroundColor: theme.SEC,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 10,
    },

    EditItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    QuantityWrapper: {
      position: 'absolute',
      backgroundColor: theme.MAIN,
      right: 20,
      paddingLeft: 10,
      justifyContent: 'center',
      borderRadius: 10,
      width: 72,
      height: 30,
    },

    QuantityText: {
      fontSize: 12,
      fontFamily: 'Righteous_400Regular',
      color: theme.SEC,
    },

    TypeText: {
      fontSize: 12,
      fontFamily: 'Righteous_400Regular',
      color: theme.SEC,
    },
  });
