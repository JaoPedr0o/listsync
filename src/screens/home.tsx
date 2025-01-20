import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import FooterList from '~/components/FooterList';
import ListCard from '~/components/ListCard';
import HeaderContentInfo from '~/components/headerContentInfo';

export default function Home({ navigation }: { navigation: any }) {
  const mockData = [
    {
      id: '1',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '2',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '3',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '4',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '5',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '6',
      Description: 'Sua lista de compras agora na palma da mão.',
    },
    {
      id: '7',
      Description: 'Sua lista de compras agora na palma da mão. Cheia de items',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <HeaderContentInfo BottomText="Aqui estão suas listas de compras." UserName="João Pedro" />
        <SafeAreaProvider>
          <SafeAreaView>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={mockData}
              renderItem={({ item }) => (
                <ListCard
                  onPress={() => navigation.navigate('Item')}
                  Description={item.Description}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
      <FooterList enable={false} isListItems={false} items={15} />
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
