import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ItemCardProps = {
  Description: string;
  Quantity: number | string;
  Type: string;
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
        <TouchableOpacity onPress={props.onEdit} style={styles.ItemEditButton}>
          <FontAwesomeIcon color="#FFFFFF" size={15} icon={faPencil} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 60,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#E0E4EA',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  TextBold: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    flex: 1,
  },

  ItemEditButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },

  EditItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  QuantityWrapper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    right: 20,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 72,
    height: 30,
  },

  QuantityText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000',
  },

  TypeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
  },
});
