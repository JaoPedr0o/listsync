import { faGears, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import SvgEmptyItens from '~/assets/EmptyItens';
import FooterList from '~/components/FooterList';
import ItemCard from '~/components/ItemCard';
import { auth, db } from '~/services/firebase';
import { fetchUserData } from '~/utils/functions/fetchUserData';
import { generateUnicId } from '~/utils/functions/generateUnicId';

export default function Item({ route }: { route: any }) {
  const navigation = useNavigation();
  const { listId } = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [itemRef, setItemRef] = useState('');
  const [listItensCount, setListItensCount] = useState(0);
  const [listActivity, setListActivity] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [listName, setListName] = useState('');
  const [listColor, setListColor] = useState('');
  const [type, setType] = useState('unit');
  const [loading, setLoading] = useState(false);

  interface ListItem {
    itemName: string;
    itemId: string;
    itemQuantity: string;
    itemType: string;
  }

  interface List {
    listId: string;
    listItens: ListItem[];
    listName: string;
    listActivity: boolean;
    listColor: string;
  }

  const loadData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        setLoading(true);
        //Chama a função para buscar os dados
        const data = await fetchUserData();

        // Acesso ao documento do usuário
        const userRef = doc(db, 'users', user.uid);

        // Pega o documento do usuário
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();

          // Garantir que o TypeScript saiba que userData.lists é um array de List
          const userLists: List[] = userData.lists;

          // Encontrar a lista com o listId específico
          const listIndex = userLists.findIndex((list) => list.listId === listId);

          if (listIndex !== -1) {
            // A lista foi encontrada, agora adiciona o item ao campo listItens dessa lista
            const openedList = userLists[listIndex];
            setListActivity(openedList.listActivity);
            setListItensCount(openedList.listItens.length);
            setListName(openedList.listName);
            setListColor(openedList.listColor);
          }
        }
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

  const listItems = targetList ? targetList.listItens : [];

  useEffect(() => {
    loadData();
  }, []);

  const addToListItems = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (itemRef !== '') {
          setLoading(true);

          // Acesso ao documento do usuário
          const userRef = doc(db, 'users', user.uid);

          // Estrutura do item a ser adicionado
          const itemData: ListItem = {
            itemName: itemRef,
            itemId: generateUnicId(),
            itemQuantity: quantity,
            itemType: type,
          };

          // Pega o documento do usuário
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();

            // Garantir que o TypeScript saiba que userData.lists é um array de List
            const userLists: List[] = userData.lists;

            // Encontrar a lista com o listId específico
            const listIndex = userLists.findIndex((list) => list.listId === listId);

            if (listIndex !== -1) {
              // A lista foi encontrada, agora adiciona o item ao campo listItens dessa lista
              const updatedList = userLists[listIndex];
              updatedList.listItens = [...updatedList.listItens, itemData]; // Adiciona o item ao listItens

              // Atualiza o documento do usuário com a lista modificada
              const updatedLists = [...userLists];
              updatedLists[listIndex] = updatedList; // Substitui a lista atualizada

              // Faz a atualização no Firestore
              await updateDoc(userRef, {
                lists: updatedLists, // Substitui todo o array de listas
              });

              Alert.alert('Item adicionado com sucesso!');
            } else {
              Alert.alert('Lista não encontrada');
            }

            loadData();
          } else {
            Alert.alert('Usuário não encontrado');
          }

          setLoading(false);
          setItemRef('');
          setQuantity('');
        } else {
          Alert.alert('Digite um nome para o item!');
        }
      } catch (error) {
        Alert.alert('Erro: ' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
    }
  };

  const handleChangeActivity = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        setLoading(true); // Inicia o carregamento enquanto o processo é realizado

        // Acesso ao documento do usuário
        const userRef = doc(db, 'users', user.uid);

        // Pega o documento do usuário
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();

          // Garantir que o TypeScript saiba que userData.lists é um array de List
          const userLists: List[] = userData.lists;

          // Encontrar a lista com o listId específico
          const listIndex = userLists.findIndex((list) => list.listId === listId);

          if (listIndex !== -1) {
            // A lista foi encontrada, agora altera o campo listActivity dessa lista
            const updatedList = userLists[listIndex];
            updatedList.listActivity = !updatedList.listActivity; // Alterna o valor de listActivity

            // Atualiza o documento do usuário com a lista modificada
            const updatedLists = [...userLists];
            updatedLists[listIndex] = updatedList; // Substitui a lista atualizada

            // Faz a atualização no Firestore
            await updateDoc(userRef, {
              lists: updatedLists, // Atualiza todo o array de listas
            });

            // Agora, atualiza o estado local após a atualização no banco
            setListActivity(updatedList.listActivity); // Atualiza o estado local
          }
        } else {
          Alert.alert('Erro ao atualizar a lista.');
        }
        setLoading(false); // Finaliza o carregamento
      } catch (error) {
        Alert.alert('Erro ao buscar listas: ' + error);
        setLoading(false); // Finaliza o carregamento em caso de erro
      }
    } else {
      Alert.alert('Usuário não autenticado');
      setLoading(false); // Finaliza o carregamento se não houver usuário autenticado
    }
  };

  const handleDeleteList = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        setLoading(true); // Inicia o carregamento enquanto o processo é realizado

        // Acesso ao documento do usuário
        const userRef = doc(db, 'users', user.uid);

        // Pega o documento do usuário
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();

          // Garantir que o TypeScript saiba que userData.lists é um array de List
          const userLists: List[] = userData.lists;

          // Encontrar o índice da lista com o listId específico
          const listIndex = userLists.findIndex((list) => list.listId === listId);

          if (listIndex !== -1) {
            // Remover a lista selecionada do array
            userLists.splice(listIndex, 1);

            // Atualizar o documento no Firestore com a nova lista
            await updateDoc(userRef, { lists: userLists });

            Alert.alert('Lista deletada com sucesso!');
            navigation.goBack();
          } else {
            Alert.alert('Lista não encontrada.');
          }
        } else {
          Alert.alert('Erro: Documento do usuário não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro ao deletar a lista: ' + error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    } else {
      Alert.alert('Usuário não autenticado');
      setLoading(false); // Finaliza o carregamento se não houver usuário autenticado
    }
  };

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
        <Text style={[styles.ListNameTitle, { backgroundColor: listColor }]}>{listName}</Text>
        <View style={styles.AddItemContainer}>
          <TextInput
            style={styles.MainInput}
            value={itemRef}
            onChangeText={setItemRef}
            placeholder="Item"
            placeholderTextColor="#878787"
            keyboardType="default"
          />
          <View style={styles.WrapperType}>
            <TextInput
              style={styles.Input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              placeholderTextColor="#878787"
              keyboardType="decimal-pad"
            />
            <TouchableOpacity style={styles.ListTypeButton}>
              <FontAwesomeIcon color="#FFFFFF" size={20} icon={faGears} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.ListAddButton} onPress={addToListItems}>
            <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPlusCircle} />
          </TouchableOpacity>
        </View>
        <SafeAreaProvider>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listItems || []}
            renderItem={({ item }) => (
              <ItemCard
                Quantity={item.itemQuantity}
                onPress={() => {}}
                Description={item.itemName}
              />
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
      <FooterList
        onDelete={handleDeleteList}
        enable={listActivity}
        isListItems
        toggle={handleChangeActivity}
        items={listItensCount}
      />
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

  AddItemContainer: {
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
    color: '#000',
    fontWeight: 'bold',
  },

  MainInput: {
    backgroundColor: '#E0E4EA',
    height: 50,
    borderRadius: 20,
    color: '#000',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 10,
    maxWidth: 160,
    minWidth: 160,
    fontWeight: 'bold',
    flex: 1,
    borderWidth: 0.1,
    borderColor: '#000000',
  },

  ListNameTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    borderRadius: 20,
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 0.1,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 1.5,
  },

  Input: {
    backgroundColor: '#E0E4EA',
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    color: '#000',
    fontSize: 12,
    width: 75,
    fontWeight: 'bold',
    flex: 1,
    borderWidth: 0.1,
    borderColor: '#000000',
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
