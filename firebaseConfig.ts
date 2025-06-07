import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your own Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyCbjJpMCM7LhWiSDQ61iBC6C8GakMDccXQ',
  authDomain: 'readyforlife-145cc.firebaseapp.com',
  projectId: 'readyforlife-145cc',
  storageBucket: 'readyforlife-145cc.appspot.com',
  messagingSenderId: '118940387246',
  appId: '1:118940387246:android:54d318ccdeaa4372b76a3f',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };

