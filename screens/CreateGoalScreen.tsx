  import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { createGoal } from '../app/goalsService';
import { auth } from '../firebaseConfig';

import { useAuth } from '../context/AuthContext';

const CreateGoalScreen: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [goalName, setGoalName] = useState('');
  const [goalStartDate, setGoalStartDate] = useState<Date | undefined>(undefined);
  const [goalEndDate, setGoalEndDate] = useState<Date | undefined>(undefined);
  const [goalInformation, setGoalInformation] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || goalStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setGoalStartDate(currentDate);
  };

  const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || goalEndDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setGoalEndDate(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleSubmit = async () => {
    setError('');
    const user = auth.currentUser;
    if (!user) {
      setError('You must be logged in to create a goal.');
      return;
    }
    try {
      const newGoal = {
        title: goalName,
        description: goalInformation,
        startDate: goalStartDate ? goalStartDate.toISOString() : null,
        endDate: goalEndDate ? goalEndDate.toISOString() : null,
        completed: false,
        userId: user.uid,
      };
      const goalId = await createGoal(newGoal);
      console.log('Goal created with ID:', goalId);
      setSuccess('Goal created successfully!');
      setGoalName('');
      setGoalStartDate(undefined);
      setGoalEndDate(undefined);
      setGoalInformation('');
      setTimeout(() => setSuccess(''), 2500);
    } catch (error) {
      console.error('Error creating goal:', error);
      setError('Error creating goal.');
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>

      <TextInput style={styles.input} placeholder="Goal Name" value={goalName} onChangeText={setGoalName} />

      <Text>Start Date:</Text>
      <Button onPress={showStartDatePickerModal} title={goalStartDate ? goalStartDate.toDateString() : 'Select Start Date'} />
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={goalStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}

      <Text>End Date:</Text>
      <Button onPress={showEndDatePickerModal} title={goalEndDate ? goalEndDate.toDateString() : 'Select End Date'} />
      {showEndDatePicker && (
        <DateTimePicker testID="endDatePicker" value={goalEndDate || new Date()} mode="date" display="default" onChange={handleEndDateChange} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Goal Information"
        value={goalInformation}
        onChangeText={setGoalInformation}
        multiline
      />

      {success ? <Text style={styles.success}>{success}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Create Goal" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  success: {
    color: 'green',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default CreateGoalScreen;