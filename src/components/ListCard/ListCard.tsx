import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './ListCard.style';

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
