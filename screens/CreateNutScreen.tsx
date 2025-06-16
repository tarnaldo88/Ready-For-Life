import { createNut } from '@/app/nutService';
import { NutStackList } from '@/navigation/NutStackNavigator';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, ImageBackground, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import createBg from '../img/createNutBg.jpg';

type Props = StackScreenProps<NutStackList, 'NutList'>;

const CreateNutScreen: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [nutName, setNutName] = useState('');
  const [nutStartDate, setnutStartDate] = useState<Date | undefined>(undefined);
  const [nutInformation, setNutInformation] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [cal, setCal]= useState('');

  const navigation = useNavigation<StackNavigationProp<NutStackList, 'NutList'>>();

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || nutStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setnutStartDate(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const handleSubmit = async () => {
    setError('');
    const user = auth.currentUser;
    if (!user) {
      setError('You must be logged in to create a food item.');
      return;
    }
    try {
      const newNut = {
        title: nutName,
        description: nutInformation,
        startDate: nutStartDate ? nutStartDate.toISOString() : null,
        calories: cal,
        userId: user.uid,
      };
      const nutId = await createNut(newNut);
      console.log('Food item created with ID:', nutId);
      setSuccess('Food item created successfully!');
      setNutName('');
      setnutStartDate(undefined);
      setNutInformation('');
      setTimeout(() => setSuccess(''), 2500);
    } catch (error) {
      console.error('Error creating Nutrition item:', error);
      setError('Error creating Nutrition item.');
      setSuccess('');
    }
  };

  return (
    <ImageBackground source={createBg} style={styles.background} resizeMode='cover'>
    <View style={styles.container}>
      <Text style={styles.title}>Create Nutrition Item</Text>

      <TextInput style={styles.input} placeholder="Food Name" placeholderTextColor="#C0C0C0" value={nutName} onChangeText={setNutName} />

      <Text style={styles.fieldTitle}>Start Date:</Text>      
      {showStartDatePicker && (
        <DateTimePicker testID="startDatePicker" value={nutStartDate || new Date()} mode="date" display="default" onChange={handleStartDateChange} />
      )}
      <TouchableOpacity style={styles.startBtn} onPress={ showStartDatePickerModal}>
        <Text style={styles.buttonText}>{nutStartDate ? nutStartDate.toDateString() : 'Select Start Date'}</Text>
      </TouchableOpacity>            
      <TextInput style={styles.input} keyboardType='numeric' placeholder="Calorie Amount" placeholderTextColor="#C0C0C0"
          onChangeText={ setCal}/>
      <TextInput
        style={styles.inputGoalInfo}
        placeholder="Nutrition Information"
        placeholderTextColor="#C0C0C0"
        value={nutInformation}
        onChangeText={setNutInformation}
        multiline
      />

      {success ? <Text style={styles.success}>{success}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Create Nutrition Item" onPress={handleSubmit} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NutList')}>
                <Text style={styles.buttonText}>Nutrition List</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
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
  endButton: { 
    backgroundColor: '#04a420', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5,
    alignItems: "center", 
  },
  startBtn: {
    backgroundColor: '#7904a4', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5,
    alignItems: "center",
  },
    buttonText: { color: '#ffff', fontSize: 18, justifyContent: 'center', },
    button: { 
      backgroundColor: '#7904a4', 
      padding: 10, 
      marginVertical: 5, 
      borderRadius: 5, 
      justifyContent: 'center', 
      alignItems: "center", 
    },
});

export default CreateNutScreen;
