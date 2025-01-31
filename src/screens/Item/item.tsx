import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import {
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
import FooterList from '~/components/FooterList/FooterList';
import ItemCard from '~/components/ItemCard/ItemCard';
import { toastConfig } from '~/components/Toast/Toast';
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
import { shareList } from '~/utils/functions/shareList';
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
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar dados!',
          text2: 'Erro:' + error,
        });
      }, 300);
      setLoading(false);
    }
  };

  const handleDeleteList = async () => {
    setLoading(true);
    try {
      await deleteListFromUser(listId);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Lista Deletada.',
        });
      }, 300);
      navigation.goBack();
    } catch (error) {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao deletar lista!',
          text2: 'Erro:' + error,
        });
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!isValidItemName(itemRef) || !isValidQuantity(quantity)) {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Nome ou quantidade inválidos!',
          text2: 'Nome: 3 a 20 caracteres. Informe a quantidade.',
        });
      }, 300);
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
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Item Adicionado.',
        });
      }, 300);
      setItemRef('');
      setQuantity('');
      setType('Un.');
      loadData();
    } catch (error) {
      console.log('Erro ao adicionar item:', error);
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao adicionar item!',
          text2: 'Ocorreu um problema. Tente novamente.',
        });
      }, 300);
    }
  };

  const handleUpdateItem = async (listId: string, itemId: string) => {
    if (!isValidItemName(itemRefEdit) || !isValidQuantity(quantityEdit)) {
      closeModal();
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Nome ou quantidade inválidos!',
          text2: 'Nome: 3 a 20 caracteres. Informe a quantidade.',
        });
      }, 300);
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
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Item Atualizado.',
        });
      }, 300);
    } catch (error) {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar item!',
          text2: 'Erro:' + error,
        });
      }, 300);
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
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Item Deletado.',
        });
      }, 300);
    } catch (error) {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao deletar item!',
          text2: 'Erro:' + error,
        });
      }, 300);
    }
  };

  const handleChangeActivity = async () => {
    try {
      const updatedActivity = await toggleListActivity(listId);
      setListActivity(updatedActivity);
    } catch (error) {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao alterar modo!',
          text2: 'Erro:' + error,
        });
      }, 300);
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
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Erro:' + error,
        });
      }, 300);
    }
  };

  const targetList = userData
    ? userData.lists.find((list: { listId: string }) => list.listId === listId)
    : null;

  const listItems = targetList ? targetList.listItens : [];

  const handleCopyList = () => {
    const textToCopy = [
      listName,
      '',
      ...listItems.map(
        (item: { itemName: string; itemQuantity: string }) =>
          `${item.itemName} - ${item.itemQuantity}`
      ),
    ].join('\n');

    Clipboard.setString(textToCopy);
  };

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
              <FontAwesome name="gears" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.ListAddButton} onPress={handleAddItem}>
            <FontAwesome name="plus-circle" size={20} color="#FFFFFF" />
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
          <Toast config={toastConfig} />
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
                    <FontAwesome name="close" size={16} color="#000000" />
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
                      <FontAwesome name="plus-circle" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.EditButtonWrapper}>
                  <TouchableOpacity
                    style={styles.EditListDeleteButton}
                    onPress={() => handleDeleteItem(editItemId)}>
                    <FontAwesome name="trash" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.EditItemButton}
                    onPress={() => handleUpdateItem(listId, editItemId)}>
                    <FontAwesome name="check" size={20} color="#FFFFFF" />
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
        onShareList={() => shareList(listName, listItems)}
        onCopyList={handleCopyList}
      />
    </View>
  );
}
