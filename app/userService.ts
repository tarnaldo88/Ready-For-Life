import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const db = getFirestore(app);

export async function getUserProfile(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
}

export async function setUserCalorieGoal(userId: string, cal: number) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { calorieGoal: cal }, { merge: true });
}

export async function getUserCalorieGoal(userId: string): Promise<number | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return typeof data.calorieGoal === 'number' ? data.calorieGoal : null;
  }
  return null;
}

export async function setUserGoalWeight(userId: string, goalWeight: number) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { goalWeight }, { merge: true });
}

export async function getUserGoalWeight(userId: string): Promise<number | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return typeof data.goalWeight === 'number' ? data.goalWeight : null;
  }
  return null;
}

export async function setUserWeight(userId: string, weight: number) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { weight }, { merge: true });
}

export async function getUserWeight(userId: string): Promise<number | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return typeof data.weight === 'number' ? data.weight : null;
  }
  return null;
}