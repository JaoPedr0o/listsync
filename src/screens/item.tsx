import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import SvgEmptyItens from '~/assets/EmptyItens';
import AddListItem from '~/components/AddListItem';
import FooterList from '~/components/FooterList';
import ItemCard from '~/components/ItemCard';
import { auth } from '~/services/firebase';
import { fetchUserData } from '~/utils/functions/fetchUserData';

export default function Item({ route }: { route: any }) {
  const { listId } = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erro ao buscar listas:' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
      setLoading(false);
    }
  };

  const targetList = userData
    ? userData.lists.find((list: { listId: string }) => list.listId === listId)
    : null;

  const listItens = targetList ? targetList.listItens : [];

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container}>
        <AddListItem />
        <SafeAreaProvider>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listItens || []}
            renderItem={({ item }) => (
              <ItemCard Quantity={0} onPress={() => {}} Description={item.itemName} />
            )}
            keyExtractor={(item) => item.itemId}
            ListEmptyComponent={
              <View style={styles.EmptyListWrapper}>
                <SvgEmptyItens />
              </View>
            }
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  EmptyListWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '70%',
  },
});
