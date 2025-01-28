import {
  faCheck,
  faGears,
  faPlusCircle,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
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

import { styles } from './item.style';
import { List, ListItem } from './item.types';
import ItemSkeleton from './itemSkeletom';

import SvgEmptyItens from '~/assets/EmptyItens';
import FooterList from '~/components/FooterList';
import ItemCard from '~/components/ItemCard';
import {
  addItemToList,
  deleteItemFromList,
  deleteListFromUser,
  getUserData,
  updateItemInList,
  toggleListActivity,
  getItemForEdit,
} from '~/services/functions';
import { generateUnicId } from '~/utils/functions/generateUnicId';
import { isValidItemName, isValidQuantity } from '~/utils/functions/validations';

export default function Item({ route }: { route: any }) {
  const navigation = useNavigation();
  const { listId } = route.params;

  // Informações gerais do usuário e lista
  const [userData, setUserData] = useState<any>(null);
  const [listName, setListName] = useState('');
  const [listActivity, setListActivity] = useState(true);
  const [listItensCount, setListItensCount] = useState(0);

  // Dados do item
  const [itemRef, setItemRef] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('Un.');
  const [quantityEdit, setQuantityEdit] = useState('');
  const [itemRefEdit, setItemRefEdit] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Estado geral
  const [loading, setLoading] = useState(true);

  // Tipos de item disponíveis
  const itemTypes = ['Un.', 'Kg.', 'G.', 'L.', 'Ml.', 'M.', 'Fatia', 'T.'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const userData = await getUserData();
      const userLists: List[] = userData.lists;
      const listIndex = userLists.findIndex((list) => list.listId === listId);

      if (listIndex !== -1) {
        const openedList = userLists[listIndex];
        setListActivity(openedList.listActivity);
        setListItensCount(openedList.listItens.length);
        setListName(openedList.listName);
      }
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro ao carregar dados' + error);
      setLoading(false);
    }
  };

  const handleDeleteList = async () => {
    setLoading(true);

    try {
      await deleteListFromUser(listId);

      Alert.alert('Lista deletada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao deletar a lista: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!isValidItemName(itemRef) || !isValidQuantity(quantity)) {
      Alert.alert('Erro', 'Nome ou quantidade inválidos');
      return;
    }

    try {
      const itemData = {
        itemName: itemRef,
        itemQuantity: quantity,
        itemType: type,
        itemId: generateUnicId(),
      };
      await addItemToList(listId, itemData);
      setItemRef('');
      setQuantity('');
      loadData();
      Alert.alert('Item Adicionado!');
    } catch (error) {
      Alert.alert('Erro ao adicionar item' + error);
    }
  };

  const handleUpdateItem = async (listId: string, itemId: string) => {
    if (!isValidItemName(itemRefEdit) || !isValidQuantity(quantityEdit)) {
      closeModal();
      Alert.alert('Erro', 'Nome ou quantidade inválidos');
      return;
    }
    setLoading(true);

    const updatedItemData: ListItem = {
      itemName: itemRefEdit,
      itemId,
      itemQuantity: quantityEdit,
      itemType: type,
    };

    try {
      await updateItemInList(listId, itemId, updatedItemData);

      setEditItemId('');
      setItemRefEdit('');
      setQuantityEdit('');
      loadData();
      closeModal();
      Alert.alert('Item atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao atualizar o item: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteItemFromList(listId, itemId);
      setItemRef('');
      setQuantity('');
      closeModal();
      loadData();
      Alert.alert('Item Deletado!');
    } catch (error) {
      Alert.alert('Erro ao deletar item' + error);
    }
  };

  const handleChangeActivity = async () => {
    try {
      const updatedActivity = await toggleListActivity(listId);
      setListActivity(updatedActivity);
    } catch (error) {
      Alert.alert('Erro ao alterar atividade da lista: ' + error);
    }
  };

  const handleOpenModalEdit = async (itemId: string) => {
    try {
      const item = await getItemForEdit(listId, itemId);
      setItemRefEdit(item.itemName);
      setQuantityEdit(item.itemQuantity);
      setType(item.itemType);
      setEditItemId(item.itemId);
      setEditModalVisible(true);
    } catch (error) {
      Alert.alert('Erro: ' + error);
    }
  };

  const targetList = userData
    ? userData.lists.find((list: { listId: string }) => list.listId === listId)
    : null;

  const listItems = targetList ? targetList.listItens : [];

  const toggleItemType = () => {
    const currentIndex = itemTypes.indexOf(type);
    const nextIndex = (currentIndex + 1) % itemTypes.length;
    setType(itemTypes[nextIndex]);
  };

  const closeModal = () => {
    setEditModalVisible(false);
    setEditItemId('');
    setItemRefEdit('');
    setQuantityEdit('');
    setType('Un.');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ItemSkeleton />
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
          <TouchableOpacity style={styles.ListAddButton} onPress={handleAddItem}>
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
                    onPress={() => handleDeleteItem(editItemId)}>
                    <FontAwesomeIcon color="#FFFFFF" size={20} icon={faTrash} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.EditItemButton}
                    onPress={() => handleUpdateItem(listId, editItemId)}>
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
