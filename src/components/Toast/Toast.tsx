import React from 'react';
import { Dimensions } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width; // Pega a largura da tela

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderRadius: 10,
        width: screenWidth * 0.9,
        minHeight: 60,
        height: 90,
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '900',
        flexWrap: 'wrap',
        color: 'black',
      }}
      text2Style={{
        fontSize: 12,
        flexWrap: 'wrap',
        color: 'black',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        borderRadius: 10,
        width: screenWidth * 0.9,
        minHeight: 60,
        height: 90,
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '900',
        flexWrap: 'wrap',
        color: 'black',
      }}
      text2Style={{
        fontSize: 12,
        flexWrap: 'wrap',
        color: 'black',
      }}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#A5D8FF',
        borderRadius: 10,
        width: screenWidth * 0.9,
        minHeight: 60,
        height: 90,
        zIndex: 1000,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '900',
        flexWrap: 'wrap',
        color: 'black',
      }}
      text2Style={{
        fontSize: 12,
        flexWrap: 'wrap',
        color: 'black',
      }}
    />
  ),
};
