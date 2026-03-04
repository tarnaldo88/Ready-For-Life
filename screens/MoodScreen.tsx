import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const MoodScreen: React.FC = () =>  {
    const { user } = useAuth();
    const userId = user?.uid || 'guest';

    return (
        <View>
            <Text>Mood Screen</Text>
        </View>
    );
}