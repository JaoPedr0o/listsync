import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    Container: {
      height: 90,
      width: '99%',
      alignSelf: 'center',
      backgroundColor: theme.GRAY_300,
      borderRadius: 10,
      flexDirection: 'row',
      paddingHorizontal: 16,
      alignItems: 'center',
      marginVertical: 5,

      shadowColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    TextBold: {
      fontSize: 16,
      color: '#3A3A3E',
      fontFamily: 'Righteous_400Regular',
      flex: 1,
    },
  });
