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

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E4EA',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  textBold: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Righteous_400Regular',
  },

  vtext: {
    position: 'absolute',
    fontFamily: 'Righteous_400Regular',
    fontSize: 10,
    padding: 15,
    right: 0,
    bottom: 0,
  },
});
