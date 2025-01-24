import { faCheckCircle, faInfoCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';

export type PopUpAlertProps = {
  type: 'Alert' | 'Confirm';
  isError?: boolean;
  title?: string;
  text?: string;
  cancelTextBtn?: string;
  confirmTextBtn?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  visible: boolean;
};

export default function PopUpAlert(props: PopUpAlertProps) {
  const [modalVisible, setModalVisible] = useState(props.visible);
  return (
    <>
      {props.type === 'Alert' ? (
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {props.isError ? (
                <View style={styles.titleWrapper}>
                  <FontAwesomeIcon color="#a00" size={14} icon={faXmarkCircle} />
                  <Text style={styles.CenteredSmallTextBlack}>{props.text}</Text>
                </View>
              ) : (
                <View style={styles.titleWrapper}>
                  <FontAwesomeIcon color="#080" size={14} icon={faCheckCircle} />
                  <Text style={styles.CenteredSmallTextBlack}>{props.text}</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.titleWrapper}>
                <FontAwesomeIcon color="#00c" size={14} icon={faInfoCircle} />
                <Text style={styles.CenteredMediumTextBlack}>{props.title}</Text>
              </View>
              <Text style={styles.CenteredSmallTextBlack}>{props.text}</Text>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.CenteredSmallTextBlack}>{props.cancelTextBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton}>
                  <Text style={styles.CenteredSmallTextWhite}>{props.confirmTextBtn}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '20%',
  },
  modalView: {
    margin: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    boxShadow: '#00000001 0px 1px 3px 0px, #878787 0px 0px 1px 0px',
    borderRadius: 20,
    padding: 30,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  titleWrapper: {
    margin: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderRadius: 20,
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  buttonWrapper: {
    margin: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderRadius: 20,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  cancelButton: {
    margin: 0,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 100,
    padding: 10,
    gap: 10,
  },

  confirmButton: {
    margin: 0,
    zIndex: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 100,
    padding: 10,
    gap: 10,
  },

  CenteredSmallTextBlack: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'justify',
    zIndex: 12,
  },

  CenteredMediumTextBlack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    zIndex: 12,
  },

  CenteredSmallTextWhite: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
    zIndex: 12,
  },

  CenteredMediumTextWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    zIndex: 12,
  },

  SmallTextBlack: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    zIndex: 12,
  },

  MediumTextBlack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    zIndex: 12,
  },

  SmallTextWhite: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    zIndex: 12,
  },

  MediumTextWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    zIndex: 12,
  },
});
