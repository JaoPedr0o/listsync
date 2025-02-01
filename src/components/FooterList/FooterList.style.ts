import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    bottom: 0,
    height: 80,
    zIndex: 40,
    borderTopLeftRadius: 10,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  WrapperFooterItemList: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  WrapperText: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },

  ActiveText: {
    color: '#59BF69',
    fontSize: 14,
    fontFamily: 'Righteous_400Regular',
  },

  InativeText: {
    color: '#878787',
    fontFamily: 'Righteous_400Regular',
    fontSize: 14,
  },

  TextBold: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Righteous_400Regular',
  },

  SmalltextBold: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Righteous_400Regular',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontFamily: 'Righteous_400Regular',
  },

  ActionButton: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    elevation: 5,
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  ActionDeleteButton: {
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    elevation: 5,
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#D32F2F',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  WrapperButtons: {
    flexDirection: 'row',
    gap: 5,
  },
});
