import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Register from '~/screens/Login/login';
import Login from '~/screens/Register/register';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Item: undefined;
  Modal: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigator: undefined;
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
    </Stack.Navigator>
  );
}
