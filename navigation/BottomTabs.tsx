import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GoalStackNavigator from '../navigation/GoalStackNavigator';
import HomeScreen from '../screens/HomeScreen';
import NutitrionScreen from '../screens/NutitrionScreen';


import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the param list for the bottom tabs
export type BottomTabParamList = {
  Home: { userId: string };
  Nutrition: { userId: string };
  GoalsHome: { userId: string };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  React.useEffect(() => {
    if (!user) {
      // Redirect to HomeScreen with dummy userId if not authenticated
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { userId: 'guest' } }],
      });
    }
  }, [user, navigation]);

  if (!user) {
    // Optionally show nothing or a spinner while redirecting
    return null;
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
      <Tab.Screen
  name="GoalsHome"
  children={(props) => <GoalStackNavigator {...props} userId={userId} />}
/>
    </Tab.Navigator>
  );
};

export default BottomTabs;