import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ItemCardProps = {
  Description: string;
  Quantity: number | string;
  onPress: () => void;
};

export default function ItemCard(props: ItemCardProps) {
  return (
    <TouchableOpacity style={styles.Container} onPress={props.onPress}>
      <Text style={styles.TextBold}>{props.Description}</Text>
      <View style={styles.EditItemWrapper}>
        <View style={styles.QuantityWrapper}>
          <Text style={styles.QuantityText}>{props.Quantity}</Text>
        </View>
        <TouchableOpacity style={styles.ItemEditButton}>
          <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPencil} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    height: 60,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#E0E4EA',
    borderRadius: 20,
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 15,
    marginTop: 0.5,
    marginLeft: 0.5,
    borderWidth: 0.1,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 1.5,
  },

  TextBold: {
    fontSize: 16,
    color: '#000000',
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

  ItemEditButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  EditItemWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  QuantityWrapper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    right: 20,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 15,
    width: 70,
    height: 30,
    borderWidth: 0.2,
    borderColor: '#000000',
  },

  QuantityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
