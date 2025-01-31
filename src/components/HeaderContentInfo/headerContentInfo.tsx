import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './headerContentInfo.style';

type headerContentInfoProps = {
  UserName: string;
  BottomText: string;
};

export default function HeaderContentInfo(props: headerContentInfoProps) {
  return (
    <View style={styles.Container}>
      <Text style={styles.TitleTextBold}>Olá!</Text>
      <Text style={styles.TextBold}>{props.UserName}</Text>
      <Text style={styles.GrayTextBold}>{props.BottomText}</Text>
    </View>
  );
}
