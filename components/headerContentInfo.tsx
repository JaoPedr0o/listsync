import { StyleSheet, Text, View } from 'react-native';

type headerContentInfoProps = {
  UserName: string;
  BottomText: string;
};

export default function HeaderContentInfo(props: headerContentInfoProps) {
  return (
    <View style={styles.Container}>
      <Text style={styles.TextBold}>Olá!</Text>
      <Text style={styles.TextBold}>{props.UserName}</Text>
      <Text style={styles.GrayTextBold}>{props.BottomText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 80,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },
});
