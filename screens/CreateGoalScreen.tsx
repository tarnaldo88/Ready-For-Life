  import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const CreateGoalScreen: React.FC = () => {
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
    console.log('Creating Goal:', {
      goalName,
      goalStartDate: goalStartDate?.toISOString(),
      goalEndDate: goalEndDate?.toISOString(),
      goalInformation,
    });
    // Here you would typically send this data to your backend
    // Example using fetch:
    // try {
    //   const response = await fetch('YOUR_CREATE_GOAL_CLOUD_FUNCTION_URL', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       goalName,
    //       goalStartDate: goalStartDate?.toISOString(),
    //       goalEndDate: goalEndDate?.toISOString(),
    //       goalInformation,
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log('Goal created:', data);
    //   // Show a success message or navigate to another screen
    // } catch (error) {
    //   console.error('Error creating goal:', error);
    //   // Show an error message
    // }
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
});

export default CreateGoalScreen;