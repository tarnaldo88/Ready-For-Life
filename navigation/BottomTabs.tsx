import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GoalStackNavigator from '../navigation/GoalStackNavigator';
import HomeScreen from '../screens/HomeScreen';
import NutStackNavigator from './NutStackNavigator';



// Define the param list for the bottom tabs
export type BottomTabParamList = {
  Home: { userId: string };
  Nutrition: undefined;
  GoalsHome: undefined;
  tabBarOptions:{
    style: {
      backgroundColor: 'your-color',
    },
  },
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  const { user } = useAuth();
  // const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const userId = user?.id;

  
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
        tabBarStyle:{backgroundColor:'#111214'}
      })}
      
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nutrition" component={NutStackNavigator} />
      <Tab.Screen
        name="GoalsHome"
        component={GoalStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;