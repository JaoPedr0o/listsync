import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ListCardProps = {
  Description: string;
  onPress: () => void;
};

export default function ListCard(props: ListCardProps) {
  return (
    <TouchableOpacity style={styles.Container} onPress={props.onPress}>
      <Text style={styles.TextBold}>{props.Description}</Text>
      <View style={styles.Circle}/>
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
    width: '90%',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },

  Circle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: 30,
    height: 30,
    right: -15,
    borderRadius: 15,
    zIndex: 5,
  },
});
