import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import Avatar from '~/components/Avatar/Avatar';
import Home from '~/screens/Home/home';
import Item from '~/screens/Item/item';
import Menu from '~/screens/Menu/menu';

export type RootStackParamList = {
  LISTSYNC: undefined;
  Item: { listId: string };
  Menu: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator initialRouteName="LISTSYNC">
      <Stack.Screen
        name="LISTSYNC"
        component={Home}
        options={({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => ({
          headerShown: true,
          headerTitleStyle: {
            fontFamily: 'Righteous_400Regular',
            fontSize: 20,
          },
          headerStyle: { shadowColor: '#FFFFFF' },
          headerRight: () => <Avatar onPress={() => navigation.navigate('Menu')} />,
        })}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{
          headerShown: true,
          title: 'LISTSYNC',
          headerTitleAlign: 'center',
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontFamily: 'Righteous_400Regular' },
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: true,
          title: 'MENU DE AÇÕES',
          headerTitleAlign: 'center',
          headerStyle: { shadowColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontFamily: 'Righteous_400Regular' },
        }}
      />
    </Stack.Navigator>
  );
}
