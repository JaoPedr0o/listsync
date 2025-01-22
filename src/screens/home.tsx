import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { doc, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
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
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import FooterList from '~/components/FooterList';
import ListCard from '~/components/ListCard';
import HeaderContentInfo from '~/components/headerContentInfo';
import { auth, db } from '~/services/firebase';

export default function Home({ navigation }: { navigation: any }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listRef, setlistRef] = useState('');

  async function fetchUserData() {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('Sem dados!');
        }
      } else {
        console.log('Usuário não authenticado');
      }
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const gerarIDUnico = () => {
    return `id-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  };

  const addToLists = async (userData: string, newListData: string) => {
    try {
      setLoading(true);
      const userRef = doc(db, 'users', userData);
      const listData = { listName: listRef, listId: gerarIDUnico() };

      await updateDoc(userRef, {
        lists: arrayUnion(listData),
      });

      console.log('Novo item adicionado ao array com sucesso!');
      fetchUserData();
      setLoading(false);
      setlistRef('');
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao adicionar item ao array: ', error);
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
        {userData ? (
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
              data={userData.lists}
              keyExtractor={(item) => item.listID}
              renderItem={({ item }) => (
                <ListCard onPress={() => navigation.navigate('Item')} Description={item.listName} />
              )}
            />

            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.addListWrapper}>
                    <TextInput
                      style={styles.ListInput}
                      placeholder="Nome da lista"
                      value={listRef}
                      onChangeText={setlistRef}
                    />
                    <TouchableOpacity
                      style={styles.ListAddButton}
                      onPress={() => addToLists(auth.currentUser.uid, listRef)}>
                      <FontAwesomeIcon color="#FFFFFF" size={20} icon={faPlusCircle} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <FontAwesomeIcon color="#FFFFFF" size={20} icon={faClose} />
                  </TouchableOpacity>
                </View>
              </View>
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
    borderRadius: 20,
    padding: 30,
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
});
