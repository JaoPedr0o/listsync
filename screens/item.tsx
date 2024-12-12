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
      Description: 'Bebel de bebezinho.',
    },
    {
      id: '2',
      Description: 'De nenenzinho.',
    },
    {
      id: '3',
      Description: 'Bebel de bebezinho.',
    },
    {
      id: '4',
      Description: 'De nenenzinho.',
    },
    {
      id: '5',
      Description: 'Bebel de bebezinho.',
    },
    {
      id: '6',
      Description: 'De nenenzinho.',
    },
    {
      id: '7',
      Description: 'Bebel de bebezinho.',
    },
    {
      id: '8',
      Description: 'De nenenzinho.',
    },
    {
      id: '9',
      Description: 'Bebel de bebezinho.',
    },
    {
      id: '10',
      Description: 'De nenenzinho.',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <AddListItem />
        <SafeAreaProvider>
          {navigation.setOptions({
            title: `Sua lista de compras agora na palma da mão.`,
          })}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mockData}
            renderItem={({ item }) => (
              <ItemCard
                Quantity={34}
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
