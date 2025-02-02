import { StyleSheet } from 'react-native';

import { ThemeType } from '~/theme/global.style';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: theme.MAIN,
      height: '100%',
    },

    Container: {
      flex: 1,
      padding: 15,
      paddingBottom: 0,
      paddingTop: 0,
      backgroundColor: theme.MAIN,
      height: '100%',
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.MAIN,
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
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    SmallWhiteTextBold: {
      fontSize: 14,
      color: theme.MAIN,
      fontFamily: 'Righteous_400Regular',
    },

    GrayTextBold: {
      fontSize: 14,
      color: theme.SEC,
      fontFamily: 'Righteous_400Regular',
    },

    MainInput: {
      backgroundColor: theme.GRAY_300,
      height: 50,
      borderRadius: 10,
      color: theme.SEC,
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 10,
      maxWidth: 160,
      minWidth: 160,
      fontFamily: 'Righteous_400Regular',
      flex: 1,
    },

    ListNameTitle: {
      fontSize: 16,
      color: theme.MAIN,
      fontFamily: 'Righteous_400Regular',
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: theme.SEC,
      padding: 10,
      borderStyle: 'solid',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    Input: {
      backgroundColor: theme.GRAY_300,
      height: 50,
      paddingLeft: 20,
      paddingRight: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      color: theme.SEC,
      fontSize: 12,
      width: 75,
      fontFamily: 'Righteous_400Regular',
      flex: 1,
    },

    ListTypeButton: {
      backgroundColor: theme.SEC,
      alignItems: 'center',
      justifyContent: 'center',
      width: 45,
      height: 50,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },

    ListAddButton: {
      backgroundColor: theme.SEC,
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
      fontFamily: 'Righteous_400Regular',
      fontSize: 10,
      color: theme.MAIN,
      margin: 2,
      borderRadius: 5,
    },

    ModalView: {
      position: 'absolute',
      top: '50%',
      margin: 0,
      zIndex: 10,
      borderRadius: 10,
      backgroundColor: theme.MAIN,
      padding: 20,
      width: 300,
      alignSelf: 'center',
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
      backgroundColor: theme.SEC,
    },

    EditItemButton: {
      backgroundColor: theme.SEC,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      flex: 3,
      borderRadius: 10,
    },

    EditListDeleteButton: {
      backgroundColor: '#F44336',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      flex: 1,
      borderRadius: 10,
    },

    CloseModalButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.MAIN,
      borderRadius: 10,
      width: 18,
      height: 18,
    },
  });
