import React, { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { addUserMoodEntry, MoodValue } from '../app/moodService';
import { useAuth } from '../context/AuthContext';

const MoodScreen: React.FC = () =>  {
    const { user } = useAuth();
    const userId = user?.uid || 'guest';

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
        <View>
            <Text>Mood Screen</Text>
        </View>
    );
}