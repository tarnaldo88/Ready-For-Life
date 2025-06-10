import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import GoalScreen from '../screens/GoalScreen';
import GoalsList from '../screens/GoalsListScreen';
import EditGoalScreen from '../screens/EditGoalScreen';

export type GoalStackParamList = {
  GoalsMain: undefined;
  GoalsList: undefined;
  CreateGoal: undefined;
  EditGoal: { goal: any };
};

const Stack = createStackNavigator<GoalStackParamList>();

import { useAuth } from '../context/AuthContext';

const GoalStackNavigator: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GoalsMain" component={GoalScreen} />
      <Stack.Screen name="GoalsList" component={GoalsList} />
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
      <Stack.Screen name="EditGoal" component={EditGoalScreen} />
    </Stack.Navigator>
  );
};

export default GoalStackNavigator;
