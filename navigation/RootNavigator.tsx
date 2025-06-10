import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import BottomTabs from './BottomTabs';

import { BottomTabParamList } from './BottomTabs';

export type RootStackParamList = {
  Home: { userId: string };
  Main: { screen?: keyof BottomTabParamList; params?: any } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ userId: 'guest' }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
