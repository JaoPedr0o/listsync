import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import Avatar from '~/components/Avatar/Avatar';
import Home from '~/screens/Home/home';
import Item from '~/screens/Item/item';
import Menu from '~/screens/Menu/menu';
import { DarkTheme } from '~/theme/global.style';
import { useTheme } from '~/theme/themeContext';

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
  const { theme } = useTheme();
  return (
    <Stack.Navigator initialRouteName="LISTSYNC">
      <Stack.Screen
        name="LISTSYNC"
        component={Home}
        options={({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => ({
          headerShown: true,
          headerTitleStyle: {
            fontFamily: 'Righteous_400Regular',
            color: theme.SEC,
            fontSize: 20,
          },
          headerStyle: { shadowColor: theme.MAIN, backgroundColor: theme.MAIN },
          headerRight: () => <Avatar onPress={() => navigation.navigate('Menu')} />,
        })}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{
          headerShadowVisible: false,
          headerBackImage: () => (
            <Ionicons name="arrow-back" size={24} color={theme === DarkTheme ? 'white' : 'black'} />
          ),
          headerShown: true,
          title: 'LISTSYNC',
          headerTitleAlign: 'center',
          headerStyle: { shadowColor: theme.MAIN, backgroundColor: theme.MAIN },
          headerTitleStyle: { fontSize: 20, fontFamily: 'Righteous_400Regular', color: theme.SEC },
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShadowVisible: false,
          headerBackImage: () => (
            <Ionicons name="arrow-back" size={24} color={theme === DarkTheme ? 'white' : 'black'} />
          ),
          headerShown: true,
          title: 'MENU DE AÇÕES',
          headerTitleAlign: 'center',
          headerStyle: { shadowColor: theme.MAIN, backgroundColor: theme.MAIN },
          headerTitleStyle: { fontSize: 20, fontFamily: 'Righteous_400Regular', color: theme.SEC },
        }}
      />
    </Stack.Navigator>
  );
}
