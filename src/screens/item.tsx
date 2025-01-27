import {
  faCheck,
  faCircleXmark,
  faClose,
  faGears,
  faPlusCircle,
  faTrash,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
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
  KeyboardAvoidingView,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

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
  const [type, setType] = useState('Un.');
  const [loading, setLoading] = useState(false);
  const [quantityEdit, setQuantityEdit] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [itemRefEdit, setItemRefEdit] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

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

  const toggleItemType = () => {
    if (type === 'Un.') {
      setType('Kg.');
    } else if (type === 'Kg.') {
      setType('G.');
    } else if (type === 'G.') {
      setType('L.');
    } else if (type === 'L.') {
      setType('Ml.');
    } else if (type === 'Ml.') {
      setType('M.');
    } else if (type === 'M.') {
      setType('Fatia');
    } else if (type === 'Fatia') {
      setType('T.');
    } else if (type === 'T.') {
      setType('Un.');
    }
  };

  const addToListItems = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (
          itemRef.length >= 3 &&
          itemRef.length <= 20 &&
          quantity.length !== 0 &&
          quantity !== '0' &&
          itemRef.trim() !== '' &&
          quantity.trim() !== ''
        ) {
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

              // Alert.alert('Item adicionado com sucesso!');
              setTimeout(() => {
                Toast.show({
                  type: 'success',
                  text1: 'Sucesso!',
                  text2: 'A operação foi concluída com sucesso.',
                  bottomOffset: 50,
                });
              }, 1000);
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
          Alert.alert(
            'O nome do item deve ter entre 3 e 20 caracteres, e a quantidade não pode ser 0.'
          );
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

  const handleDeleteListItem = async (itemId: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        setLoading(true);

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
            // A lista foi encontrada, agora vamos buscar o item com itemId
            const updatedList = userLists[listIndex];
            const itemIndex = updatedList.listItens.findIndex((item) => item.itemId === itemId);

            if (itemIndex !== -1) {
              // O item foi encontrado, agora vamos removê-lo
              updatedList.listItens.splice(itemIndex, 1); // Remove o item

              // Atualiza o documento do usuário com a lista modificada
              const updatedLists = [...userLists];
              updatedLists[listIndex] = updatedList; // Substitui a lista atualizada

              // Faz a atualização no Firestore
              await updateDoc(userRef, {
                lists: updatedLists, // Substitui todo o array de listas
              });

              setEditModalVisible(false);
              setEditItemId('');
              setItemRefEdit('');
              setQuantityEdit('');

              // Notifica o sucesso
              setTimeout(() => {
                Toast.show({
                  type: 'success',
                  text1: 'Sucesso!',
                  text2: 'O item foi removido com sucesso.',
                  bottomOffset: 50,
                });
              }, 1000);
            } else {
              Alert.alert('Item não encontrado na lista.');
            }
          } else {
            Alert.alert('Lista não encontrada');
          }

          loadData();
        } else {
          Alert.alert('Usuário não encontrado');
        }

        setLoading(false);
      } catch (error) {
        Alert.alert('Erro: ' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
    }
  };

  const handleOpenModalEdit = async (itemId: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
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
            // A lista foi encontrada, agora vamos procurar o item com itemId
            const updatedList = userLists[listIndex];
            const item = updatedList.listItens.find((item) => item.itemId === itemId);

            if (item) {
              setItemRefEdit(item.itemName);
              setQuantityEdit(item.itemQuantity);
              setType(item.itemType);
              setEditItemId(item.itemId);
              setEditModalVisible(true);
            } else {
              Alert.alert('Item não encontrado');
            }
          } else {
            Alert.alert('Lista não encontrada');
          }
        } else {
          Alert.alert('Usuário não encontrado');
        }
      } catch (error) {
        Alert.alert('Erro: ' + error);
      }
    } else {
      Alert.alert('Usuário não autenticado');
    }
  };

  const handleUpdateListItem = async (itemId: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (
          itemRef.length >= 3 &&
          itemRef.length <= 20 &&
          quantity.length !== 0 &&
          quantity !== '0' &&
          itemRef.trim() !== '' &&
          quantity.trim() !== ''
        ) {
          setLoading(true);

          // Acesso ao documento do usuário
          const userRef = doc(db, 'users', user.uid);

          // Estrutura do item a ser atualizado
          const updatedItemData: ListItem = {
            itemName: itemRefEdit,
            itemId, // Manter o itemId original
            itemQuantity: quantityEdit,
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
              // A lista foi encontrada, agora vamos buscar o item com itemId
              const updatedList = userLists[listIndex];
              const itemIndex = updatedList.listItens.findIndex((item) => item.itemId === itemId);

              if (itemIndex !== -1) {
                // O item foi encontrado, vamos atualizar as propriedades
                updatedList.listItens[itemIndex] = updatedItemData;

                // Atualiza o documento do usuário com a lista modificada
                const updatedLists = [...userLists];
                updatedLists[listIndex] = updatedList; // Substitui a lista atualizada
                // Faz a atualização no Firestore
                await updateDoc(userRef, {
                  lists: updatedLists, // Substitui todo o array de listas
                });

                setEditModalVisible(false);

                // Notifica o sucesso
                setTimeout(() => {
                  Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'O item foi atualizado com sucesso.',
                    bottomOffset: 50,
                  });
                }, 1000);
              } else {
                Alert.alert('Item não encontrado na lista.');
              }
            } else {
              Alert.alert('Lista não encontrada');
            }

            loadData();
          } else {
            Alert.alert('Usuário não encontrado');
          }

          setLoading(false);
          setEditItemId('');
          setItemRefEdit('');
          setQuantityEdit('');
        } else {
          Alert.alert(
            'O nome do item deve ter entre 3 e 20 caracteres, e a quantidade não pode ser 0.'
          );
        }
      } catch (error) {
        Alert.alert('Erro: ' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
    }
  };

  const closeModal = () => {
    setEditModalVisible(false);
    setEditItemId('');
    setItemRefEdit('');
    setQuantityEdit('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
        <Text style={[styles.ListNameTitle]}>{listName}</Text>
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
            <TouchableOpacity style={styles.ListTypeButton} onPress={toggleItemType}>
              {editModalVisible === false && <Text style={styles.TypeIndicator}>{type}</Text>}
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
                onEdit={() => handleOpenModalEdit(item.itemId)}
                Type={item.itemType}
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
          <Toast />
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Modal
              animationType="slide"
              transparent
              visible={editModalVisible}
              onRequestClose={closeModal}>
              <View style={styles.ModalView}>
                <View style={styles.EditTitleWrapper}>
                  <Text style={styles.SmallWhiteTextBold}>Edição de Item</Text>
                  <TouchableOpacity
                    style={styles.CloseModalButton}
                    hitSlop={25}
                    onPress={() => closeModal()}>
                    <FontAwesomeIcon color="#000000" size={18} icon={faXmark} />
                  </TouchableOpacity>
                </View>
                <View style={styles.AddItemContainer}>
                  <TextInput
                    style={styles.MainInput}
                    value={itemRefEdit}
                    onChangeText={setItemRefEdit}
                    placeholder="Item"
                    placeholderTextColor="#878787"
                    keyboardType="default"
                  />
                  <View style={styles.WrapperType}>
                    <TextInput
                      style={styles.Input}
                      value={quantityEdit}
                      onChangeText={setQuantityEdit}
                      placeholder="0"
                      placeholderTextColor="#878787"
                      keyboardType="decimal-pad"
                    />
                    <TouchableOpacity style={styles.ListTypeButton} onPress={toggleItemType}>
                      <Text style={styles.TypeIndicator}>{type}</Text>
                      <FontAwesomeIcon color="#FFFFFF" size={20} icon={faGears} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.EditButtonWrapper}>
                  <TouchableOpacity
                    style={styles.EditListDeleteButton}
                    onPress={() => handleDeleteListItem(editItemId)}>
                    <FontAwesomeIcon color="#FFFFFF" size={20} icon={faTrash} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.EditItemButton}
                    onPress={() => handleUpdateListItem(editItemId)}>
                    <FontAwesomeIcon color="#FFFFFF" size={20} icon={faCheck} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>
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
  MainContainer: {
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
    marginTop: 0,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginBottom: 0,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  SmallWhiteTextBold: {
    fontSize: 14,
    color: 'white',
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
    borderRadius: 10,
    color: '#000',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 10,
    maxWidth: 160,
    minWidth: 160,
    fontWeight: 'bold',
    flex: 1,
  },

  ListNameTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  Input: {
    backgroundColor: '#E0E4EA',
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#000',
    fontSize: 12,
    width: 75,
    fontWeight: 'bold',
    flex: 1,
  },

  ListTypeButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  ListAddButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  WrapperType: {
    position: 'relative',
    flexDirection: 'row',
    flex: 1,
  },

  TypeIndicator: {
    zIndex: 3,
    fontWeight: '900',
    fontSize: 12,
    padding: 2,
    color: '#FFFFFF',
    margin: 2,
    borderRadius: 5,
  },

  ModalView: {
    position: 'absolute',
    top: '50%',
    margin: 0,
    zIndex: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 300,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ translateY: -100 }],
  },

  EditButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexBasis: 4,
    gap: 5,
  },

  EditTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexBasis: 4,
    gap: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#000000',
  },

  EditItemButton: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 3,
    borderRadius: 10,
  },

  EditListDeleteButton: {
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 1,
    borderRadius: 10,
  },

  CloseModalButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 18,
    height: 18,
  },
});
