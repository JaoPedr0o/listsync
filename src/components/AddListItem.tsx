import { faGears, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddListItem() {
  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.MainInput}
        value=""
        placeholder="Item"
        placeholderTextColor="#878787"
        keyboardType="default"
      />
      <View style={styles.WrapperType}>
        <TextInput
          style={styles.Input}
          value=""
          placeholder="222kgs"
          placeholderTextColor="#878787"
          keyboardType="decimal-pad"
        />
        <TouchableOpacity style={styles.ListTypeButton}>
          <FontAwesomeIcon color="#FFFFFF" size={20} icon={faGears} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.ListAddButton}>
        <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPlusCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 0.5,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },

  MainInput: {
    backgroundColor: '#E0E4EA',
    height: 50,
    borderRadius: 20,
    color: '#878787',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 10,
    maxWidth: 200,
    minWidth: 160,
    fontWeight: 'bold',
    flex: 1,
  },

  Input: {
    backgroundColor: '#E0E4EA',
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    color: '#878787',
    fontSize: 12,
    width: 75,
    fontWeight: 'bold',
    flex: 1,
  },

  ListTypeButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  ListAddButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 20,
  },

  WrapperType: {
    flexDirection: 'row',
    flex: 1,
  },
});
