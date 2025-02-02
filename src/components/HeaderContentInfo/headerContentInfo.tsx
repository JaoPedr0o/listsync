import React from 'react';
import { Text, View } from 'react-native';

import { createStyles } from './headerContentInfo.style';

import { useTheme } from '~/theme/themeContext';

type headerContentInfoProps = {
  UserName: string;
  BottomText: string;
};

export default function HeaderContentInfo(props: headerContentInfoProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.Container}>
      <Text style={styles.TitleTextBold}>Olá!</Text>
      <Text style={styles.TextBold}>{props.UserName}</Text>
      <Text style={styles.GrayTextBold}>{props.BottomText}</Text>
    </View>
  );
}
