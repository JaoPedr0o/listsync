import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import DrawerNavigator from './drawer-navigator';

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
          title: 'LISTSYNC',
          headerTitleAlign: 'center',
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: '900' },
          headerRight: () => <Avatar />,
        }}
      />
    </Stack.Navigator>
  );
}
