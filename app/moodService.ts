import { addDoc, collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from ".";

 
export type MoodValue =
  | 'Amazing'
  | 'Good'
  | 'Okay'
  | 'Meh'
  | 'Sad'
  | 'Anxious'
  | 'Angry'
  | 'Stressed'
  | 'Tired';

export type MoodEntry = {
  id: string;
  mood: MoodValue;
  note: string;
  date: string; // ISO
  createdAt: string; // ISO
};
 
const db = getFirestore(app);

export async function addUserMoodEntry(params: {
  userId: string;
  mood: MoodValue;
  note?: string;
  date?: Date;
}) {
  const { userId, mood, note = '', date = new Date() } = params;
 
  const moodsRef = collection(db, 'users', userId, 'moods');
  await addDoc(moodsRef, {
    mood,
    note,
    date: date.toISOString(),
    createdAt: new Date().toISOString(),
  });
}

export async function getUserMoodHistory(userId: string): Promise<MoodEntry[]> {
  const moodsRef = collection(db, 'users', userId, 'moods');
  const q = query(moodsRef, orderBy('date', 'desc'));
 
  const snap = await getDocs(q);
 
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      mood: data.mood,
      note: data.note || '',
      date: data.date || '',
      createdAt: data.createdAt || '',
    };
  });
}