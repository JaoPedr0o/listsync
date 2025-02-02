import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SvgLogoSmall from '~/assets/LogoSmall';
import Register from '~/screens/Login/login';
import PasswordRecoveryScreen from '~/screens/Password/password';
import Login from '~/screens/Register/register';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Item: undefined;
  Modal: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigator: undefined;
  PasswordRecoveryScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function PublicRoutes() {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="PasswordRecoveryScreen"
        component={PasswordRecoveryScreen}
        options={{
          title: 'Recuperar Senha',
          headerShown: true,
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
          headerRight: () => <SvgLogoSmall />,
          headerRightContainerStyle: { padding: 15 },
        }}
      />
    </Stack.Navigator>
  );
}
