import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '.';
import Home from '../screens/Home/home';

import Avatar from '~/components/Avatar/Avatar';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: Props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="LISTSYNC"
        component={Home}
        options={{
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: '#000000',
          drawerInactiveTintColor: '#000000',
          drawerItemStyle: {
            borderRadius: 20,
          },
          headerBackgroundContainerStyle: {
            borderRadius: 0,
          },
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            width: '80%',
          },
          drawerLabelStyle: {
            color: 'white',
            borderRadius: 0,
          },
          headerRight: () => <Avatar />,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Righteous_400Regular',
            fontSize: 20,
          },
          drawerIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
          headerStyle: { shadowColor: '#FFFFFF' },
          headerLeft: () => null,
        }}
      />
    </Drawer.Navigator>
  );
}
