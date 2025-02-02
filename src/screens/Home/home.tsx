import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { styles } from './home.style';

import SvgEmptyList from '~/assets/EmptyList';
import FooterList from '~/components/FooterList/FooterList';
import HeaderContentInfo from '~/components/HeaderContentInfo/headerContentInfo';
import ListCard from '~/components/ListCard/ListCard';
import { toastConfig } from '~/components/Toast/Toast';
import { auth, db } from '~/services/firebase';
import { getUserData } from '~/services/functions';
import { generateUnicId } from '~/utils/functions/generateUnicId';

export default function Home({ navigation }: { navigation: any }) {
  const textInputRef = useRef<TextInput>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listRef, setlistRef] = useState('');
  const [listInputColor, setListInputColor] = useState('#E0E4EA');

  const loadData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const data = await getUserData();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar listas!',
          text2: 'Erro:' + error,
          visibilityTime: 1000,
        });

        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Usuário não authenticado!',
        text2: 'Faça login ou crie uma conta.',
        visibilityTime: 1000,
      });

      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    NavigationBar.setBackgroundColorAsync('#FFFFFF');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFocus = () => {
    setModalVisible(true);
    textInputRef.current?.focus();
  };

  const addToLists = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (listRef !== '' && listRef.length <= 30 && listRef.length >= 5) {
          setLoading(true);
          const userRef = doc(db, 'users', user.uid);
          const listData = {
            listName: listRef,
            listId: generateUnicId(),
            listItens: [],
            listActivity: false,
            listColor: listInputColor,
            listSelectedItens: {},
          };

          await updateDoc(userRef, {
            lists: arrayUnion(listData),
          });
          Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Nova lista criada.',
            visibilityTime: 1000,
          });

          navigation.navigate('Item', { listId: listData.listId });
          loadData();
          setLoading(false);
          setlistRef('');
          setModalVisible(false);
          setListInputColor('#E0E4EA');
        } else {
          Toast.show({
            type: 'info',
            text1: 'Nome Imcopatível!',
            text2: 'Digite um nome para a lista entre 5 e 30 caracteres.',
            visibilityTime: 1000,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar lista!',
          text2: 'Erro:' + error,
          visibilityTime: 1000,
        });

        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Usuário não authenticado!',
        text2: 'Faça login ou crie uma conta.',
        visibilityTime: 1000,
      });
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
      <View style={styles.container}>
        {auth.currentUser ? (
          <HeaderContentInfo
            BottomText="Aqui estão suas listas de compras."
            UserName={userData.displayName}
          />
        ) : (
          <Text>Erro ao carregar dados do usuário</Text>
        )}

        <SafeAreaProvider>
          <SafeAreaView>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={userData?.lists || []}
              keyExtractor={(item) => (item.listId ? item.listId.toString() : String(item.index))}
              renderItem={({ item }) => (
                <ListCard
                  onPress={() => navigation.navigate('Item', { listId: item.listId })}
                  Description={item.listName}
                  Color={item.listColor}
                />
              )}
              ListEmptyComponent={
                <View style={styles.EmptyListWrapper}>
                  <SvgEmptyList />
                </View>
              }
            />
            <Toast config={toastConfig} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={closeModal}>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.addListWrapper}>
                      <TextInput
                        ref={textInputRef}
                        style={[styles.ListInput, { borderLeftColor: listInputColor }]}
                        placeholder="Nome da lista"
                        value={listRef}
                        onChangeText={setlistRef}
                        autoFocus
                      />
                      <TouchableOpacity style={styles.ListAddButton} onPress={addToLists}>
                        <FontAwesome name="plus-circle" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.ColorsWrapper}>
                      <TouchableOpacity
                        onPress={() => setListInputColor('#F1F3F5')}
                        style={[styles.ColorInput, { backgroundColor: '#F1F3F5' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#FFF5BA')}
                        style={[styles.ColorInput, { backgroundColor: '#FFF5BA' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#D1E7DD')}
                        style={[styles.ColorInput, { backgroundColor: '#D1E7DD' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#A5D8FF')}
                        style={[styles.ColorInput, { backgroundColor: '#A5D8FF' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#E7DFFD')}
                        style={[styles.ColorInput, { backgroundColor: '#E7DFFD' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#FFD8D8')}
                        style={[styles.ColorInput, { backgroundColor: '#FFD8D8' }]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>

      <FooterList enable={false} onPress={handleFocus} isListItems={false} items={15} />
    </View>
  );
}
