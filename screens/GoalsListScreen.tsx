import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { GoalStackParamList } from '../navigation/GoalStackNavigator';

type Props = StackScreenProps<GoalStackParamList, 'GoalsList'>;

const GoalsListScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      <Text>User ID: {userId}</Text>
      <Text>This is where the list of goals will be displayed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default GoalsListScreen;