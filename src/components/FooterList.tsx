/* eslint-disable prettier/prettier */
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from './Button';
import CustomSwitch from './SwitchCustom';

type FooterListProps = {
  items?: number;
  enable: boolean;
  isListItems: boolean;
  onPress?: () => void;
  toggle?: () => void;
  onDelete?: () => void;
};

export default function FooterList(props: FooterListProps) {
  const [isEnable] = useState(props.enable);
  return (
    <View style={styles.Container}>
      {props.isListItems ? (
        <View style={styles.WrapperFooterItemList}>
          <View style={styles.WrapperText}>
            {props.enable ? (
              <Text style={styles.ActiveText}>COMPRA</Text>
            ) : (
              <Text style={styles.InativeText}>EDIÇÃO</Text>
            )}
            <Text style={styles.SmalltextBold}>{props.items ? props.items : '0'} itens</Text>
          </View>
          <TouchableOpacity onPress={props.onDelete} style={styles.ActionButton}>
            <FontAwesome name="trash" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ActionButton}>
            <FontAwesome name="file-pdf-o" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ActionButton}>
            <FontAwesome name="share" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <CustomSwitch isActive={isEnable} onToggle={props.toggle} />
        </View>
      ) : (
        <Button onPress={props.onPress} title="NOVA LISTA" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    bottom: 0,
    height: 80,
    zIndex: 40,
    borderTopLeftRadius: 10,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  WrapperFooterItemList: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  WrapperText: {
    width: 70,
    justifyContent: 'center',
    gap: 1,
  },

  ActiveText: {
    color: '#59BF69',
    fontWeight: '900',
    fontSize: 16,
  },

  InativeText: {
    color: '#878787',
    fontWeight: '900',
    fontSize: 16,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  SmalltextBold: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },

  ActionButton: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    elevation: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
