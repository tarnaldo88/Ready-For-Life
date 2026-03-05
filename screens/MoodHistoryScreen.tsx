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
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
 
      {loading ? (
        <ActivityIndicator color="#7904a4" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(x) => x.id}
          ListEmptyComponent={<Text style={styles.empty}>No mood entries yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.rowTop}>
                <Text style={styles.mood}>{item.mood}</Text>
                <Text style={styles.date}>
                  {item.date ? `  ${Moment(item.date).format('MMM DD, YYYY')}` : ''}
                </Text>
              </Text>
              {!!item.note && <Text style={styles.note}>{item.note}</Text>}
            </View>
          )}
        />
      )}
    </View>
  );
}