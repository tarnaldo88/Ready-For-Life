import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111214', padding: 16 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700', marginBottom: 12 },
  empty: { color: '#cfcfcf', marginTop: 12 },
  card: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    marginBottom: 10,
  },
  rowTop: { color: '#fff', marginBottom: 6 },
  mood: { color: '#fff', fontWeight: '700', fontSize: 16 },
  date: { color: '#cfcfcf' },
  note: { color: '#fff' },
});
 
export default MoodHistoryScreen;