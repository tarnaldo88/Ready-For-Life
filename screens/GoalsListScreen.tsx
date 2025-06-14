import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteGoal, getGoals, Goal } from '../app/goalsService';
import { useAuth } from '../context/AuthContext';
import goalListBg from '../img/goalListBg.jpg';
import { GoalStackParamList } from '../navigation/GoalStackNavigator';

type Props = StackScreenProps<GoalStackParamList, 'GoalsList'>;

const GoalsListScreen: React.FC<Props> = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const navigation = useNavigation<StackNavigationProp<GoalStackParamList, 'GoalsList'>>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  var moment = require('moment');
  

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchGoals = async () => {
        setLoading(true);
        console.log('userId:', userId);
        try {
          const userGoals = await getGoals(userId);
          console.log('Fetched goals:', userGoals);
          if (isActive){ 
            setGoals(userGoals);
            handleGoalDates(userGoals);
          };
        } catch (err) {
          console.error('Error fetching goals:', err);
          if (isActive) setError('Failed to load goals: ' + userId);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      const handleGoalDates = async (goals: Goal[]) => {
          for(let i = 0; i < goals.length; i++){
            
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

  const handleGoalDates = async (goals: Goal[]) => {

  };

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
    navigation.navigate('EditGoal', { goal });
  };

  return (
    <ImageBackground source={goalListBg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item }) => (                      
          <View style={styles.goalItem}>
            <LinearGradient
              colors={['#c33cfd','#3cd9fd' ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            >
            <Text style={styles.goalTitle}>{item.title}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
            {item.startDate ? <Text>Start: {Moment(item.startDate).format('d MM YYYY')}</Text> : null}
            {item.endDate ? <Text>End: {Moment(item.endDate).format('d MM YYYY')}</Text> : null}
            <Text >Status: {item.completed ? 'Completed' : 'In Progress'}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id!)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>
          </View>          
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateGoal')}>
          <Text style={styles.buttonText}>Create New Goal</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
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
    color: 'white',
  },
  goalItem: {
    width: '100%',
    
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 4,
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { backgroundColor: '#7904a4', padding: 10, marginVertical: 5, borderRadius: 5, alignItems: "center", },
});

export default GoalsListScreen;