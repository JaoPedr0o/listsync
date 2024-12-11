/* eslint-disable prettier/prettier */
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Button } from './Button';

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
            {props.enable ? <Text style={styles.ActiveText}>● ATIVA</Text> : <Text style={styles.InativeText}>● INATIVA</Text>}
            <Text style={styles.SmalltextBold}>{props.items ? props.items : "0"} itens</Text>
          </View>
          <Button title="APAGAR LISTA" />
          <Switch trackColor={{false: '#BF6259', true: '#59BF69'}} style={styles.Switch}/>
        </View> 
      : 
        <Button title="NOVA LISTA" />}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 80,
    borderTopLeftRadius: 20,
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
    width: 80,
    justifyContent: 'center',
    gap: 5,
  },

  Switch: {
    height: 60,
  },

  ActiveText: {
    color: "#59BF69",
    fontWeight: 'bold',
    fontSize: 14,
  },

  InativeText: {
    color: "#BF6259",
    fontWeight: 'bold',
    fontSize: 14,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  SmalltextBold: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },
});
