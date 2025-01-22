import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';

import { auth } from '~/services/firebase';

export type RootStackParamList = {
  PrivateRoutes: undefined;
  PublicRoutes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'PrivateRoutes' : 'PublicRoutes'}>
        {isAuthenticated ? (
          <Stack.Screen
            name="PrivateRoutes"
            component={PrivateRoutes}
            options={{
              headerShown: false,
              headerStyle: { shadowColor: '#FFFFFF' },
              headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
            }}
          />
        ) : (
          <Stack.Screen
            name="PublicRoutes"
            component={PublicRoutes}
            options={{
              headerShown: false,
              headerStyle: { shadowColor: '#FFFFFF' },
              headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
