import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { updateNut } from '../app/nutService';
import nutListBg from '../img/goalListBg.jpg';

type Props = StackScreenProps<NutStackList, 'EditNut'>;

import { NutStackList } from '@/navigation/NutStackNavigator';
import { useAuth } from '../context/AuthContext';

const EditNutScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nut } = route.params;
  const { user } = useAuth();
  const [nutName, setNutName] = useState(nut.title);
  const [nutInformation, setNutInformation] = useState(nut.description || '');
  const [nutStartDate, setNutStartDate] = useState<Date | undefined>(nut.startDate ? new Date(nut.startDate) : undefined);
  const [nutEndDate, setNutEndDate] = useState<Date | undefined>(nut.endDate ? new Date(nut.endDate) : undefined);
  const [completed, setCompleted] = useState(!!nut.completed);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || nutStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setNutStartDate(currentDate);
  };

  const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || nutEndDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setNutEndDate(currentDate);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      await updateNut(nut.id, {
        title: nutName,
        description: nutInformation,
        startDate: nutStartDate ? nutStartDate.toISOString() : null,
        endDate: nutEndDate ? nutEndDate.toISOString() : null,
        completed,
      });
      navigation.goBack();
    } catch (err) {
      setError('Failed to update nut');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={nutListBg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <Text style={styles.title}>Edit Nutrition</Text>       
      <TextInput style={styles.input} placeholder="Food Name"  placeholderTextColor="#C0C0C0"  value={nutName} onChangeText={setNutName} />
      <Text style={styles.smTitle}>Start Date:</Text>
      <Button onPress={() => setShowStartDatePicker(true)} title={nutStartDate ? nutStartDate.toDateString() : 'Select Start Date'} />
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={nutStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      <Text style={styles.smTitle}>End Date:</Text>
      <Button onPress={() => setShowEndDatePicker(true)} title={nutEndDate ? nutEndDate.toDateString() : 'Select End Date'} />
      {showEndDatePicker && (
        <DateTimePicker testID="endDatePicker" value={nutEndDate || new Date()} mode="date" display="default" onChange={handleEndDateChange} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nutrition Information"
        placeholderTextColor="#C0C0C0"
        value={nutInformation}
        onChangeText={setNutInformation}
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
