/* eslint-disable prettier/prettier */
import { faTrash, faFilePdf, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from './Button';
import CustomSwitch from './SwitchCustom';

type FooterListProps = {
  items?: number;
  enable: boolean;
  isListItems: boolean;
};

export default function FooterList(props: FooterListProps) {
  return (
    <View style={styles.Container}>
      {props.isListItems ? 
        <View style={styles.WrapperFooterItemList}>
          <View style={styles.WrapperText}>
            {props.enable ? <Text style={styles.ActiveText}>ATIVA</Text> : <Text style={styles.InativeText}>INATIVA</Text>}
            <Text style={styles.SmalltextBold}>{props.items ? props.items : "0"} itens</Text>
          </View>
          <TouchableOpacity style={styles.ActionButton}>
            <FontAwesomeIcon color="#FFFFFF" size={20} icon={faTrash} />  
          </TouchableOpacity> 
          <TouchableOpacity style={styles.ActionButton}>
            <FontAwesomeIcon color="#FFFFFF" size={20} icon={faFilePdf} />  
          </TouchableOpacity> 
          <TouchableOpacity style={styles.ActionButton}>
            <FontAwesomeIcon color="#FFFFFF" size={20} icon={faShareNodes} />  
          </TouchableOpacity> 
          <CustomSwitch isActive={props.enable}/>
        </View> 
      : 
        <Button title="NOVA LISTA" />}
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
    borderTopLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    boxShadow: '#00000001 0px 1px 3px 0px, #878787 0px 0px 1px 0px',
  },

  WrapperFooterItemList: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  WrapperText: {
    width: 70,
    justifyContent: 'center',
    gap: 1,
  },

  ActiveText: {
    color: "#59BF69",
    fontWeight: 'bold',
    fontSize: 16,
  },

  InativeText: {
    color: "#BF6259",
    fontWeight: 'bold',
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
    borderRadius: 24,
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
