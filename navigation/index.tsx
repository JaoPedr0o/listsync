import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from 'screens/item';

import DrawerNavigator from './drawer-navigator';
import Modal from '../screens/modal';
import Avatar from 'components/Avatar';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Item: undefined;
  Modal: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
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
            headerRight: () => <Avatar></Avatar>
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
