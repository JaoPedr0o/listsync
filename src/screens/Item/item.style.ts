import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    fontSize: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 18,
    height: 18,
  },
});
