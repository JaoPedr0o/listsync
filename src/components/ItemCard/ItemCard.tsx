import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ItemCard.style';
import CustomCheckbox from '../Checkbox/Checkbox';

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
            <FontAwesome name="pencil" size={15} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <CustomCheckbox value={props.isSelected} onChange={props.onToggle} />
        )}
      </View>
    </View>
  );
}
