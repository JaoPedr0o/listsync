import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { List } from '~/screens/Item/item.types';
import { db, auth } from '~/services/firebase'; // Certifique-se de ter as instâncias de db e auth

// Função para obter os dados do usuário
export const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error('Usuário não encontrado');
  }
};

// Função para deletar uma lista do usuário
export const deleteListFromUser = async (listId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('Documento do usuário não encontrado');
    }

    const userData = userSnap.data();
    const userLists: List[] = userData.lists;

    // Encontrar o índice da lista que será deletada
    const listIndex = userLists.findIndex((list) => list.listId === listId);

    if (listIndex === -1) {
      throw new Error('Lista não encontrada');
    }

    // Remover a lista do array
    userLists.splice(listIndex, 1);

    // Atualizar o documento no Firestore com a nova lista
    await updateDoc(userRef, { lists: userLists });
  } catch (error) {
    throw new Error(`Erro ao deletar lista: ${error}`);
  }
};

// Função para adicionar item a uma lista
export const addItemToList = async (listId: string, itemData: any) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('Usuário não encontrado');

  const userData = userSnap.data();
  const userLists = userData.lists;

  const listIndex = userLists.findIndex((list: any) => list.listId === listId);
  if (listIndex === -1) throw new Error('Lista não encontrada');

  const updatedList = {
    ...userLists[listIndex],
    listItens: [...userLists[listIndex].listItens, itemData],
  };
  userLists[listIndex] = updatedList;

  await updateDoc(userRef, { lists: userLists });
};

// Função para atualizar item de uma lista
export const updateItemInList = async (listId: string, itemId: string, updatedItemData: any) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('Usuário não encontrado');

  const userData = userSnap.data();
  const userLists = userData.lists;

  const listIndex = userLists.findIndex((list: any) => list.listId === listId);
  if (listIndex === -1) throw new Error('Lista não encontrada');

  const updatedList = userLists[listIndex];
  const itemIndex = updatedList.listItens.findIndex((item: any) => item.itemId === itemId);
  if (itemIndex === -1) throw new Error('Item não encontrado');

  updatedList.listItens[itemIndex] = updatedItemData;
  userLists[listIndex] = updatedList;

  await updateDoc(userRef, { lists: userLists });
};

// Função para deletar item da lista
export const deleteItemFromList = async (listId: string, itemId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('Usuário não encontrado');

  const userData = userSnap.data();
  const userLists = userData.lists;

  const listIndex = userLists.findIndex((list: any) => list.listId === listId);
  if (listIndex === -1) throw new Error('Lista não encontrada');

  const updatedList = userLists[listIndex];
  const itemIndex = updatedList.listItens.findIndex((item: any) => item.itemId === itemId);
  if (itemIndex === -1) throw new Error('Item não encontrado');

  updatedList.listItens.splice(itemIndex, 1);
  userLists[listIndex] = updatedList;

  await updateDoc(userRef, { lists: userLists });
};

// Função modularizada para atualizar a atividade da lista
export const toggleListActivity = async (listId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error('Usuário não encontrado');
  }

  const userData = userSnap.data();
  const userLists: List[] = userData.lists;

  const listIndex = userLists.findIndex((list) => list.listId === listId);
  if (listIndex === -1) {
    throw new Error('Lista não encontrada');
  }

  const updatedList = userLists[listIndex];
  updatedList.listActivity = !updatedList.listActivity; // Alterna a atividade da lista

  // Atualiza a lista no Firestore
  const updatedLists = [...userLists];
  updatedLists[listIndex] = updatedList;
  await updateDoc(userRef, { lists: updatedLists });

  return updatedList.listActivity;
};

// Função modularizada para buscar os dados do item a ser editado
export const getItemForEdit = async (listId: string, itemId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error('Usuário não encontrado');
  }

  const userData = userSnap.data();
  const userLists: List[] = userData.lists;

  const listIndex = userLists.findIndex((list) => list.listId === listId);
  if (listIndex === -1) {
    throw new Error('Lista não encontrada');
  }

  const updatedList = userLists[listIndex];
  const item = updatedList.listItens.find((item) => item.itemId === itemId);
  if (!item) {
    throw new Error('Item não encontrado');
  }

  return item;
};
