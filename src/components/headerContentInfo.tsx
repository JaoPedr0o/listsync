import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  Container: {
    height: 75,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  TitleTextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },
});
