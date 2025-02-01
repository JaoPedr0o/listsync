import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: 30,
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'space-between',
  },

  LargeTextBlack: {
    fontSize: 18,
    fontFamily: 'Righteous_400Regular',
    color: '#000',
  },

  SmallTextBlack: {
    fontSize: 14,
    fontFamily: 'Righteous_400Regular',
    color: '#000',
    textAlign: 'justify',
  },

  SmallTextPurple: {
    fontSize: 14,
    fontFamily: 'Righteous_400Regular',
    color: '#6C59BF',
    textAlign: 'center',
  },

  LogoImage: {
    width: '95%',
    height: 60,
    marginVertical: 25,
  },

  FormInput: {
    width: '100%',
    marginBottom: 20,
    gap: 20,
  },

  LoginInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    fontSize: 14,
    fontFamily: 'Righteous_400Regular',
  },

  ActiveIndicator: {
    marginTop: 30,
  },
});
