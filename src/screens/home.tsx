import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFocusEffect } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
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

import SvgEmptyList from '~/assets/EmptyList';
import FooterList from '~/components/FooterList';
import ListCard from '~/components/ListCard';
import HeaderContentInfo from '~/components/headerContentInfo';
import { auth, db } from '~/services/firebase';
import { fetchUserData } from '~/utils/functions/fetchUserData';
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
                        <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPlusCircle} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.ColorsWrapper}>
                      <TouchableOpacity
                        onPress={() => setListInputColor('#E0E4EA')}
                        style={[styles.ColorInput, { backgroundColor: '#E0E4EA' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#F1F491')}
                        style={[styles.ColorInput, { backgroundColor: '#F1F491' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#BFF491')}
                        style={[styles.ColorInput, { backgroundColor: '#BFF491' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#91DFF4')}
                        style={[styles.ColorInput, { backgroundColor: '#91DFF4' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#F491DF')}
                        style={[styles.ColorInput, { backgroundColor: '#F491DF' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setListInputColor('#F49191')}
                        style={[styles.ColorInput, { backgroundColor: '#F49191' }]}
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    margin: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    boxShadow: '#00000001 0px 1px 3px 0px, #878787 0px 0px 1px 0px',
    padding: 20,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 4,
    elevation: 8.5,
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  ListInput: {
    height: 60,
    width: '80%',
    borderRadius: 20,
    paddingVertical: 14,
    backgroundColor: '#E0E4EA',
    borderRightWidth: 10,
    paddingLeft: 14,
    paddingRight: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  ListAddButton: {
    backgroundColor: '#000000',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  EmptyListWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '70%',
  },

  ColorsWrapper: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ColorInput: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 4,
    elevation: 0.5,
  },
});
