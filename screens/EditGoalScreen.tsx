import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Switch } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StackScreenProps } from '@react-navigation/stack';
import { GoalStackParamList } from '../navigation/GoalStackNavigator';
import { updateGoal } from '../app/goalsService';

// Add EditGoal to GoalStackParamList in navigator
// Params: { goal: Goal, userId: string }
type Props = StackScreenProps<GoalStackParamList, 'EditGoal'>;

const EditGoalScreen: React.FC<Props> = ({ route, navigation }) => {
  const { goal, userId } = route.params;
  const [goalName, setGoalName] = useState(goal.title);
  const [goalInformation, setGoalInformation] = useState(goal.description || '');
  const [goalStartDate, setGoalStartDate] = useState<Date | undefined>(goal.startDate ? new Date(goal.startDate) : undefined);
  const [goalEndDate, setGoalEndDate] = useState<Date | undefined>(goal.endDate ? new Date(goal.endDate) : undefined);
  const [completed, setCompleted] = useState(!!goal.completed);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      await updateGoal(goal.id, {
        title: goalName,
        description: goalInformation,
        startDate: goalStartDate ? goalStartDate.toISOString() : null,
        endDate: goalEndDate ? goalEndDate.toISOString() : null,
        completed,
      });
      navigation.goBack();
    } catch (err) {
      setError('Failed to update goal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Goal</Text>
      <TextInput style={styles.input} placeholder="Goal Name" value={goalName} onChangeText={setGoalName} />
      <Text>Start Date:</Text>
      <Button onPress={() => setShowStartDatePicker(true)} title={goalStartDate ? goalStartDate.toDateString() : 'Select Start Date'} />
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={goalStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      <Text>End Date:</Text>
      <Button onPress={() => setShowEndDatePicker(true)} title={goalEndDate ? goalEndDate.toDateString() : 'Select End Date'} />
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
      <View style={styles.switchRow}>
        <Text>Completed:</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Saving...' : 'Save Changes'} onPress={handleUpdate} disabled={loading} />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="#aaa" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default EditGoalScreen;
