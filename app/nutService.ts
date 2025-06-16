import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, getFirestore, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const db = getFirestore(app);
const nutCollection = collection(db, 'Nutrition');

export interface Nut {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  [key: string]: any;
}

// Create a new goal
export async function createNut(nut: Omit<Nut, 'id'>): Promise<string> {
  const docRef = await addDoc(nutCollection, nut);
  return docRef.id;
}

// Get all goals
import { query, where } from 'firebase/firestore';

export async function getNut(userId: string): Promise<Nut[]> {
  const q = query(nutCollection, where('userId', '==', userId));
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
export async function updateNut(id: string, updates: Partial<Nut>): Promise<void> {
  const nutDoc = doc(db, 'Nutrition', id);
  await updateDoc(nutDoc, updates);
}

// Delete a goal
export async function deleteNut(id: string): Promise<void> {
  const nutDoc = doc(db, 'Nutrition', id);
  await deleteDoc(nutDoc);
}
