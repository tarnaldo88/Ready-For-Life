import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getGoals, Goal, deleteGoal } from '../app/goalsService';
import { StackScreenProps } from '@react-navigation/stack';
import { GoalStackParamList } from '../navigation/GoalStackNavigator';

type Props = StackScreenProps<GoalStackParamList, 'GoalsList'>;

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const GoalsListScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation<StackNavigationProp<GoalStackParamList, 'GoalsList'>>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchGoals = async () => {
        setLoading(true);
        console.log('userId:', userId);
        try {
          const userGoals = await getGoals(userId);
          console.log('Fetched goals:', userGoals);
          if (isActive) setGoals(userGoals);
        } catch (err) {
          console.error('Error fetching goals:', err);
          if (isActive) setError('Failed to load goals');
        } finally {
          if (isActive) setLoading(false);
        }
      };
      fetchGoals();
      return () => {
        isActive = false;
      };
    }, [userId])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (goals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Goals List</Text>
        <Text>No goals found for this user.</Text>
      </View>
    );
  }

  const handleDelete = async (goalId: string) => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await deleteGoal(goalId);
            setGoals(goals.filter(g => g.id !== goalId));
          } catch (err) {
            setError('Failed to delete goal');
          }
        }
      }
    ]);
  };

  const handleEdit = (goal: Goal) => {
    navigation.navigate('EditGoal', { goal, userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalTitle}>{item.title}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
            {item.startDate ? <Text>Start: {item.startDate}</Text> : null}
            {item.endDate ? <Text>End: {item.endDate}</Text> : null}
            <Text>Status: {item.completed ? 'Completed' : 'In Progress'}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id!)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalItem: {
    width: '100%',
    backgroundColor: '#e9eff7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#6cc6e8',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#e86c6c',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GoalsListScreen;