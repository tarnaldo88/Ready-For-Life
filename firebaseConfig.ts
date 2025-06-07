import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import key from './Key';

// TODO: Replace with your own Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: key,
  authDomain: 'readyforlife-145cc.firebaseapp.com',
  projectId: 'readyforlife-145cc',
  storageBucket: 'readyforlife-145cc.appspot.com',
  messagingSenderId: '118940387246',
  appId: '1:118940387246:android:54d318ccdeaa4372b76a3f',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// let auth: Auth;
// try {
//   // Only initialize Auth if not already initialized
//   auth = getAuth(app);
//   if (!auth.app) {
//     auth = initializeAuth(app, {
//       persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//     });
//   }
// } catch (e) {
//   // If getAuth fails (e.g., first time), initialize it
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
// }
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, db, storage };
