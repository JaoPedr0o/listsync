import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.MAIN,
      height: '100%',
    },
    container: {
      flex: 1,
      padding: 15,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.MAIN,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.MAIN,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalView: {
      margin: 0,
      zIndex: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: theme.MAIN,
      padding: 20,
      width: '100%',
      shadowColor: theme.SEC,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    ListInput: {
      height: 60,
      width: '80%',
      borderRadius: 10,
      paddingVertical: 14,
      backgroundColor: '#E9ECEF',
      borderLeftWidth: 8,
      paddingLeft: 16,
      paddingRight: 24,
      fontFamily: 'Righteous_400Regular',
      fontSize: 16,
      color: '#343A40',
      textAlignVertical: 'center',
    },
    ListAddButton: {
      backgroundColor: theme.SEC,
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addListWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ColorsWrapper: {
      margin: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ColorInput: {
      width: 40,
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#DEE2E6',
    },
    EmptyListWrapper: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      marginTop: '60%',
    },
  });
