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
    position: 'relative',
    boxShadow: '#00000001 1px 1px 3px 0px',
    height: 90,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#E0E4EA',
    borderRadius: 20,
    flexDirection: 'row',
    paddingLeft: 14,
    alignItems: 'center',
    gap: 20,
    marginBottom: 15,
    marginTop: 0.5,
    marginLeft: 0.5,
    borderWidth: 0.1,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 1.5,
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
});
