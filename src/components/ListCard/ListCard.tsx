import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { createStyles } from './ListCard.style';

import { useTheme } from '~/theme/themeContext';

export type ListCardProps = {
  Description: string;
  onPress: () => void;
  Color: string;
};

export default function ListCard(props: ListCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.Container, { backgroundColor: props.Color }]}
      onPress={props.onPress}>
      <Text style={styles.TextBold}>{props.Description}</Text>
    </TouchableOpacity>
  );
}
