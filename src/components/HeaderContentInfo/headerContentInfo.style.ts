import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    Container: {
      height: 75,
    },

    TextBold: {
      fontSize: 20,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    TitleTextBold: {
      fontSize: 20,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    GrayTextBold: {
      fontSize: 14,
      color: theme.GRAY_400,
      fontFamily: 'Righteous_400Regular',
    },
  });
