import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ListCardProps = {
  Description: string;
  onPress: () => void;
};

export default function ListCard(props: ListCardProps) {
  return (
    <TouchableOpacity style={styles.Container} onPress={props.onPress}>
      <View style={styles.Image} />
      <Text style={styles.TextBold}>{props.Description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    height: 90,
    width: '99%',
    backgroundColor: '#E0E4EA',
    borderRadius: 20,
    flexDirection: 'row',
    paddingLeft: 14,
    alignItems: 'center',
    gap: 20,
    marginBottom: 15,
    marginTop: 0.5,
    marginLeft: 0.5,
  },

  TextBold: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },

  Image: {
    width: 65,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
});
