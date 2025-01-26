import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ListCardProps = {
  Description: string;
  onPress: () => void;
  Color: string;
};

export default function ListCard(props: ListCardProps) {
  return (
    <TouchableOpacity
      style={[styles.Container, { backgroundColor: props.Color }]}
      onPress={props.onPress}>
      <Text style={styles.TextBold}>{props.Description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 90,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#E0E4EA',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  TextBold: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
});
