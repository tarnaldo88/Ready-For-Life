import { Picker } from '@react-native-picker/picker';
import React, { useMemo, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { addUserMoodEntry, MoodValue } from '../app/moodService';
import { useAuth } from '../context/AuthContext';

const MoodScreen: React.FC = () =>  {
    const { user } = useAuth();
    const userId = user?.uid;

    const moodOptions = useMemo<MoodValue[]>(
        () => ['Amazing', 'Good', 'Okay', 'Meh', 'Sad', 'Anxious', 'Angry', 'Stressed', 'Tired'],
        []
    );
    
    const [mood, setMood] = useState<MoodValue>('Okay');
    const [note, setNote] = useState('');

    const onSave = async () => {
        if (!userId) {
        Alert.alert('Not logged in', 'You must be logged in to save a mood entry.');
        return;
        }
    
        try {
        await addUserMoodEntry({ userId, mood, note });
        setNote('');
        Alert.alert('Saved', 'Mood entry saved.');
        } catch (e) {
        Alert.alert('Error', 'Could not save mood entry.');
        console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mood Check-in</Text>
        
            <Text style={styles.label}>Current mood</Text>
            <View style={styles.pickerWrap}>
                <Picker selectedValue={mood} onValueChange={(v) => setMood(v)}>
                {moodOptions.map((m) => (
                    <Picker.Item key={m} label={m} value={m} />
                ))}
                </Picker>
            </View>
        
            <Text style={styles.label}>Optional note</Text>
            <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
                placeholder="What’s going on today?"
                placeholderTextColor="#999"
                multiline
            />
        
            <Button title="Save Mood" onPress={onSave} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111214' },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 16 },
  label: { color: '#fff', fontSize: 16, marginBottom: 8, marginTop: 12 },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1b1e',
  },
  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    backgroundColor: '#1a1b1e',
    marginBottom: 16,
  },
});
 
export default MoodScreen;