import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: 30,
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  LargeTextBlack: {
    fontSize: 20,
    fontFamily: 'Righteous_400Regular',
    color: '#000000',
    marginBottom: 20,
  },
  FormInput: {
    width: '100%',
    marginBottom: 20,
    color: '#000000',
  },
  LoginInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    color: '#000000',
    width: '100%',
    fontSize: 14,
    fontFamily: 'Righteous_400Regular',
  },
  Button: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: 'Righteous_400Regular',
    color: '#FFFFFF',
  },
  svgLockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
