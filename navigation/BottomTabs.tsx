import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import ProfileScreen from '../app/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import GoalScreen from '../screens/GoalScreen';

// Define the param list for the bottom tabs
export type BottomTabParamList = {
  Home: { userId: string };
  Profile: { userId: string };
  Goals: { userId: string };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  const userId = "123"; // TODO: Replace with real userId from auth/context
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Simple emoji icons for demonstration
          let icon = '🏠';
          if (route.name === 'Profile') icon = '👤';
          if (route.name === 'Goals') icon = '🎯';
          return <Text style={{ fontSize: size }}>{icon}</Text>;
        },
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userId }} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ userId }} />
      <Tab.Screen name="Goals" component={GoalScreen} initialParams={{ userId }} />
    </Tab.Navigator>
  );
};

export default BottomTabs;