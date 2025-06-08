import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import GoalScreen from '../screens/GoalScreen';
import GoalsList from '../screens/GoalsListScreen';
import EditGoalScreen from '../screens/EditGoalScreen';

export type GoalStackParamList = {
  GoalsHome: { userId: string };
  GoalsList: { userId: string };
  CreateGoal: { userId: string };
  EditGoal: { goal: any; userId: string };
};

const Stack = createStackNavigator<GoalStackParamList>();

const GoalStackNavigator: React.FC<{ userId: string }> = ({ userId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GoalsHome" component={GoalScreen} initialParams={{ userId }} />
    <Stack.Screen name="GoalsList" component={GoalsList} initialParams={{ userId }} />
    <Stack.Screen name="CreateGoal" component={CreateGoalScreen} initialParams={{ userId }} />
    <Stack.Screen name="EditGoal" component={EditGoalScreen} />
  </Stack.Navigator>
);

export default GoalStackNavigator;
