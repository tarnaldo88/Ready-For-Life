import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import GoalScreen from '../screens/GoalScreen';
import GoalsList from '../screens/GoalsListScreen';

export type GoalStackParamList = {
  Goals: { userId: string };
  GoalsList: { userId: string };
  CreateGoal: { userId: string };
};

const Stack = createStackNavigator<GoalStackParamList>();

const GoalStackNavigator: React.FC<{ userId: string }> = ({ userId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Goals" component={GoalScreen} initialParams={{ userId }} />
    <Stack.Screen name="GoalsList" component={GoalsList} initialParams={{ userId }} />
    <Stack.Screen name="CreateGoal" component={CreateGoalScreen} initialParams={{ userId }} />
  </Stack.Navigator>
);

export default GoalStackNavigator;
