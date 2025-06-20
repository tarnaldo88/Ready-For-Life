import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, getFirestore, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const db = getFirestore(app);
const goalsCollection = collection(db, 'goals');

export interface Goal {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  [key: string]: any;
}

// Create a new goal
export async function createGoal(goal: Omit<Goal, 'id'>): Promise<string> {
  const docRef = await addDoc(goalsCollection, goal);
  return docRef.id;
}

// Get all goals
import { query, where } from 'firebase/firestore';

export async function getGoals(userId: string): Promise<Goal[]> {
  const q = query(goalsCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title ?? '',
      description: data.description,
      completed: data.completed,
      ...data,
    };
  });
}


// Update a goal
export async function updateGoal(id: string, updates: Partial<Goal>): Promise<void> {
  const goalDoc = doc(db, 'goals', id);
  await updateDoc(goalDoc, updates);
}

// Delete a goal
export async function deleteGoal(id: string): Promise<void> {
  const goalDoc = doc(db, 'goals', id);
  await deleteDoc(goalDoc);
}
