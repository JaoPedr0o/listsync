import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
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
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listRef, setlistRef] = useState('');

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
  }, []);

  const closeModal = () => {
    setModalVisible(false);
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
          };

          await updateDoc(userRef, {
            lists: arrayUnion(listData),
          });
          Alert.alert('Nova lista criada com sucesso!');
          loadData();
          setLoading(false);
          setlistRef('');
          setModalVisible(false);
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
                />
              )}
              ListEmptyComponent={
                <View style={styles.EmptyListWrapper}>
                  <SvgEmptyList />
                </View>
              }
            />

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
                <KeyboardAvoidingView style={styles.modalView}>
                  <View style={styles.addListWrapper}>
                    <TextInput
                      style={styles.ListInput}
                      placeholder="Nome da lista"
                      value={listRef}
                      onChangeText={setlistRef}
                      autoFocus
                    />
                    <TouchableOpacity style={styles.ListAddButton} onPress={addToLists}>
                      <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPlusCircle} />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </TouchableOpacity>
            </Modal>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>

      <FooterList
        enable={false}
        onPress={() => setModalVisible(true)}
        isListItems={false}
        items={15}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: '#E0E4EA',
    borderRadius: 20,
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 14,
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
});
