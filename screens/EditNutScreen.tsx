import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { updateGoal } from '../app/goalsService';
import goalListBg from '../img/goalListBg.jpg';

// Add EditGoal to GoalStackParamList in navigator
// Params: { goal: Goal, userId: string }
type Props = StackScreenProps<NutStackList, 'EditNut'>;

import { NutStackList } from '@/navigation/NutStackNavigator';
import { useAuth } from '../context/AuthContext';

const EditNutScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nut } = route.params;
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [goalName, setGoalName] = useState(nut.title);
  const [goalInformation, setGoalInformation] = useState(nut.description || '');
  const [goalStartDate, setGoalStartDate] = useState<Date | undefined>(nut.startDate ? new Date(nut.startDate) : undefined);
  const [goalEndDate, setGoalEndDate] = useState<Date | undefined>(nut.endDate ? new Date(nut.endDate) : undefined);
  const [completed, setCompleted] = useState(!!nut.completed);
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
      await updateGoal(nut.id, {
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
    <ImageBackground source={goalListBg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <Text style={styles.title}>Edit Goal</Text>       
      <TextInput style={styles.input} placeholder="Goal Name"  placeholderTextColor="#C0C0C0"  value={goalName} onChangeText={setGoalName} />
      <Text style={styles.smTitle}>Start Date:</Text>
      <Button onPress={() => setShowStartDatePicker(true)} title={goalStartDate ? goalStartDate.toDateString() : 'Select Start Date'} />
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={goalStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      <Text style={styles.smTitle}>End Date:</Text>
      <Button onPress={() => setShowEndDatePicker(true)} title={goalEndDate ? goalEndDate.toDateString() : 'Select End Date'} />
      {showEndDatePicker && (
        <DateTimePicker testID="endDatePicker" value={goalEndDate || new Date()} mode="date" display="default" onChange={handleEndDateChange} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Goal Information"
        placeholderTextColor="#C0C0C0"
        value={goalInformation}
        onChangeText={setGoalInformation}
        multiline
      />
      <View style={styles.switchRow}>
        <Text style={styles.smTitle}>Completed:</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Saving...' : 'Save Changes'} onPress={handleUpdate} disabled={loading} />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="#aaa" />
    </View>
    </ImageBackground>
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
    color:'white'
  },
  smTitle:{
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    color:'white',
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditNutScreen;
