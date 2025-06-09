import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import GoalStackNavigator from '../navigation/GoalStackNavigator';
import HomeScreen from '../screens/HomeScreen';
import NutitrionScreen from '../screens/NutitrionScreen';
import { useAuth } from '../app/AuthContext';


// Define the param list for the bottom tabs
export type BottomTabParamList = {
  Home: { userId: string };
  Nutrition: { userId: string };
  GoalsHome: { userId: string };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    // You can show a loading spinner or redirect to login here
    return <Text>Loading user...</Text>;
  }
  const userId = user.id;

  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Simple emoji icons for demonstration
          let icon = '🏠';
          if (route.name === 'Nutrition') icon = '🍽️';
          if (route.name === 'GoalsHome') icon = '🎯';
          return <Text style={{ fontSize: size }}>{icon}</Text>;
        },
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userId }} />
      <Tab.Screen name="Nutrition" component={NutitrionScreen} initialParams={{ userId }} />
      <Tab.Screen name="GoalsHome" children={() => <GoalStackNavigator userId={userId} />} />
    </Tab.Navigator>
  );
};

export default BottomTabs;