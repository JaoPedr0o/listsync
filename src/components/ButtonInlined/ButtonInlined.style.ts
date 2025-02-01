import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#FFF',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Righteous_400Regular',
    textAlign: 'center',
  },
});
