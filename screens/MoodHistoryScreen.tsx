import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getUserMoodHistory, MoodEntry } from '../app/moodService';
import { useAuth } from '../context/AuthContext';

const MoodHistoryScreen: React.FC = () => {
    const { user } = useAuth();
    const [items, setItems] = useState<MoodEntry[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
    
        async function run() {
        if (!user?.uid) return;
        setLoading(true);
        try {
            const history = await getUserMoodHistory(user.uid);
            if (active) setItems(history);
        } finally {
            if (active) setLoading(false);
        }
        }
    
        run();
        return () => { active = false; };
    }, [user?.uid]);

  return (
    <View>
      <Text>Mood History</Text>
    </View>
  );
}