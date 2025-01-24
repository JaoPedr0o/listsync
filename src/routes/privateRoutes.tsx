import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import DrawerNavigator from './drawer-navigator';
import Modal from '../screens/modal';

import Avatar from '~/components/Avatar';
import Item from '~/screens/item';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Item: { listId: string };
  Modal: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{
          headerShown: true,
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
          headerRight: () => <Avatar />,
        }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ presentation: 'modal', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}
