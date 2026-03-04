import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { MoodValue } from '../app/moodService';
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

    return (
        <View>
            <Text>Mood Screen</Text>
        </View>
    );
}