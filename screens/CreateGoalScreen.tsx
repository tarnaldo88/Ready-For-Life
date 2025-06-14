  import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createGoal } from '../app/goalsService';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import goalBg from '../img/medBg.jpg';

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
    <ImageBackground source={goalBg} style={styles.background} resizeMode='cover'>
    <View style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>

      <TextInput style={styles.input} placeholder="Goal Name" placeholderTextColor="#C0C0C0" value={goalName} onChangeText={setGoalName} />

      <Text style={styles.fieldTitle}>Start Date:</Text>      
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={goalStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      <TouchableOpacity style={styles.startBtn} onPress={ showStartDatePickerModal}>
        <Text style={styles.buttonText}>{goalStartDate ? goalStartDate.toDateString() : 'Select Start Date'}</Text>
      </TouchableOpacity>

      <Text style={styles.fieldTitle}>End Date:</Text>      
      <TouchableOpacity style={styles.button} onPress={ showEndDatePickerModal}>
        <Text style={styles.buttonText}>{goalEndDate ? goalEndDate.toDateString() : 'Select End Date'}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker testID="endDatePicker" value={goalEndDate || new Date()} mode="date" display="default" onChange={handleEndDateChange} />
      )}

      <TextInput
        style={styles.inputGoalInfo}
        placeholder="Goal Information"
        placeholderTextColor="#C0C0C0"
        value={goalInformation}
        onChangeText={setGoalInformation}
        multiline
      />

      {success ? <Text style={styles.success}>{success}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Create Goal" onPress={handleSubmit} />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    marginTop:100,
    width:"auto"
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 12,
    color:'white'
  },
  fieldTitle: {
    color:'white',
    marginBottom:15,
    marginTop:10,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 25,
    marginTop:25,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    color: 'white',
    fontSize:16,
  },
  inputGoalInfo:{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 25,
    marginTop:25,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    color: 'white',
    height:100,  
    flex:1, 
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
   background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { 
    backgroundColor: '#04a420', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5 
  },
  startBtn: {
    backgroundColor: '#7904a4', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5
  },
    buttonText: { color: '#ffff', fontSize: 18 },
});

export default CreateGoalScreen;