import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    height: 90,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#E0E4EA',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  TextBold: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Righteous_400Regular',
    flex: 1,
  },
});
