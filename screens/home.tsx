import FooterList from 'components/FooterList';
import ListCard from 'components/ListCard';
import HeaderContentInfo from 'components/headerContentInfo';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <HeaderContentInfo BottomText="Aqui estão suas listas de compras." UserName="João Pedro" />
        {/* <FlatList data={} renderItem={}/> */}
        <ListCard Description="Sua lista de compras agora na palma da mão." />
        <ListCard Description="Sua lista de compras agora na palma da mão." />
        <ListCard Description="Sua lista de compras agora na palma da mão." />
        <ListCard Description="Sua lista de compras agora na palma da mão." />
        <ListCard Description="Sua lista de compras agora na palma da mão." />
      </View>
      <FooterList enable={false} isListItems items={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },

  Container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
});
