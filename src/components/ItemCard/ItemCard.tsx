import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { createStyles } from './ItemCard.style';
import CustomCheckbox from '../Checkbox/Checkbox';

import { useTheme } from '~/theme/themeContext';

export type ItemCardProps = {
  Description: string;
  Quantity: number | string;
  Type: string;
  Mode?: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onEdit: () => void;
};

export default function ItemCard(props: ItemCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.Container}>
      <Text style={styles.TextBold}>{props.Description}</Text>
      <View style={styles.EditItemWrapper}>
        <View style={styles.QuantityWrapper}>
          <Text style={styles.QuantityText}>
            {props.Quantity}
            <Text style={styles.TypeText}>{props.Type}</Text>
          </Text>
        </View>
        {props.Mode ? (
          <TouchableOpacity onPress={props.onEdit} style={styles.ItemEditButton}>
            <FontAwesome name="pencil" size={15} color={theme.MAIN} />
          </TouchableOpacity>
        ) : (
          <CustomCheckbox value={props.isSelected} onChange={props.onToggle} />
        )}
      </View>
    </View>
  );
}
