/* eslint-disable prettier/prettier */
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FooterList.style';
import { Button } from '../Button/Button';
import CustomSwitch from '../SwitchCustom/SwitchCustom';

type FooterListProps = {
  items?: number;
  selectedItens?: number;
  enable: boolean;
  isListItems: boolean;
  onPress?: () => void;
  toggle?: () => void;
  onDelete?: () => void;
  onShareList?: () => void;
  onCopyList?: () => void;
};

export default function FooterList(props: FooterListProps) {
  const [isEnable, setIsEnable] = useState(props.enable);
  
  const handleToggle = () => {
    const newValue = !isEnable;
    setIsEnable(newValue);
    if (props.toggle) {
      props.toggle();
    }
  };

  return (
    <View style={styles.Container}>
      {props.isListItems ? (
        <View style={styles.WrapperFooterItemList}>
          <View style={styles.WrapperText}>
            {isEnable ? (
              <>
                <Text style={styles.ActiveText}>COMPRA</Text>
                <Text style={styles.SmalltextBold}>{props.selectedItens ? props.selectedItens : 0}/{props.items ? props.items : '0'} ITENS</Text>
              </>
            ) : (
              <>
                <Text style={styles.InativeText}>EDIÇÃO</Text>
                <Text style={styles.SmalltextBold}>{props.items ? props.items : '0'} ITENS</Text>
              </>
            )}
            
          </View>
          <View style={styles.WrapperButtons}>
            <TouchableOpacity onPress={props.onDelete} style={styles.ActionDeleteButton}>
              <FontAwesome name="trash" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onCopyList} style={styles.ActionButton}>
              <FontAwesome name="copy" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onShareList} style={styles.ActionButton}>
              <FontAwesome name="share-alt" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <CustomSwitch isActive={isEnable} onToggle={handleToggle} />
        </View>
      ) : (
        <Button onPress={props.onPress} title="NOVA LISTA" />
      )}
    </View>
  );
}
