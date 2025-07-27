import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export type Weight = {
  id: string;
  weight: number;
  date: string;
};

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

// Add a new entry to the user's weight history
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Set user's first and last name in Firestore
export async function setUserProfileName(userId: string, firstName: string, lastName: string) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { firstName, lastName }, { merge: true });
}

// Get user's first and last name from Firestore
export async function getUserProfileName(userId: string): Promise<{ firstName: string; lastName: string } | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
    };
  }
  return null;
}

// Fetch all historical weights for a user
export async function getUserWeightHistory(userId: string): Promise<Weight[]> {
  const weightsRef = collection(db, 'users', userId, 'weights');
  const querySnapshot = await getDocs(weightsRef);
  const weights: Weight[] = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      weight: typeof data.weight === 'number' ? data.weight : parseFloat(data.weight),
      date: data.date || '',
    };
  });
  return weights;
}

export async function addUserWeightEntry(userId: string, weight: number, date: Date) {
  const weightsRef = collection(db, 'users', userId, 'weights');
  await addDoc(weightsRef, {
    weight,
    date: date.toISOString(),
    createdAt: new Date().toISOString()
  });
}

export async function setUserLowLim(userId: string, lowLim: string) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { lowLim }, { merge: true });
}

export async function getUserLowLim(userId: string): Promise<string> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    return typeof data.lowLim === 'string' ? data.lowLim : (typeof data.lowLim === 'number' ? data.lowLim.toString() : '0');
  }
  return '0';
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