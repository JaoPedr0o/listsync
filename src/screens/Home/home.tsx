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
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { styles } from './home.style';

import SvgEmptyList from '~/assets/EmptyList';
import FooterList from '~/components/FooterList';
import ListCard from '~/components/ListCard';
import HeaderContentInfo from '~/components/headerContentInfo';
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
        Alert.alert('Erro ao buscar listas:' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
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
            listActivity: true,
            listColor: listInputColor,
          };

          await updateDoc(userRef, {
            lists: arrayUnion(listData),
          });
          Alert.alert('Nova lista criada com sucesso!');
          navigation.navigate('Item', { listId: listData.listId });
          loadData();
          setLoading(false);
          setlistRef('');
          setModalVisible(false);
          setListInputColor('#E0E4EA');
        } else {
          Alert.alert('Digite um nome para a lista entre 5 e 30 caracteres!');
        }
      } catch (error) {
        Alert.alert('Erro ao adicionar item ao array: ' + error);
        setLoading(false);
      }
    } else {
      Alert.alert('Usuário não autenticado');
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
