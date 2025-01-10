import AddListItem from 'components/AddListItem';
import FooterList from 'components/FooterList';
import ItemCard from 'components/ItemCard';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Item({ navigation }: { navigation: any }) {
  const mockData = [
    {
      id: '1',
      Description: 'Item 1.',
    },
    {
      id: '2',
      Description: 'Item 2.',
    },
    {
      id: '3',
      Description: 'Item 3.',
    },
    {
      id: '4',
      Description: 'Item 4.',
    },
    {
      id: '5',
      Description: 'Item 5.',
    },
    {
      id: '6',
      Description: 'Item 6.',
    },
    {
      id: '7',
      Description: 'Item 7.',
    },
    {
      id: '8',
      Description: 'Item 8.',
    },
    {
      id: '9',
      Description: 'Item 9.',
    },
    {
      id: '10',
      Description: 'Item 10.',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <AddListItem />
        <SafeAreaProvider>
          {/* {navigation.setOptions({
            title: `Sua lista de compras agora na palma da mão.`,
          })} */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mockData}
            renderItem={({ item }) => (
              <ItemCard
                Quantity={0}
                onPress={() => navigation.navigate('Item')}
                Description={item.Description}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <SafeAreaView />
        </SafeAreaProvider>
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
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
});
