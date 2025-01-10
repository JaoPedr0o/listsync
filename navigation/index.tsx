import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Avatar from 'components/Avatar';
import Item from 'screens/item';
import Login from 'screens/login';

import DrawerNavigator from './drawer-navigator';
import Modal from '../screens/modal';
import Register from 'screens/register';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Item: undefined;
  Modal: undefined;
  Login: undefined;
  Register: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
    </NavigationContainer>
  );
}
