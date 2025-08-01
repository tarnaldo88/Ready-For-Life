import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { addUserWeightEntry, getUserGoalWeight, getUserLowLim, getUserWeightHistory, setUserGoalWeight, setUserLowLim, Weight } from '../app/userService';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import loginBg from '../img/loginBg.jpg';
import matrixBg from '../img/matrix.jpg';
import defaultAvatar from '../img/smeagol.png';
import { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [lowLim, setLowLim] = useState('0');
  const [xAxisLowLim, setXAxisLowLim] = useState('0');
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [goalWeightInput, setGoalWeightInput] = useState('');
  const [editingGoalWeight, setEditingGoalWeight] = useState(false);
  const [editingCurrentWeight, setEditingCurrentWeight] = useState(false);
  const [editingLowLim, setEditingLowLim] = useState(false);
  const [goalWeightLoading, setGoalWeightLoading] = useState(false);
  const [weights, setWeights] = useState<Weight[]>([]);
  const [weightChartLoading, setWeightChartLoading] = useState(false);
  // New state for weight entry
  const [weightInput, setWeightInput] = useState('');
  const [weightDate, setWeightDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const navigation = useNavigation<HomeScreenProps['navigation']>();


  // Avatar picker handler
  const handleAvatarPress = async () => {
    if (!user) return;
    const { getFirestore, doc, setDoc } = await import('firebase/firestore');
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your photos to change your avatar.');
      return;
    }
    // Pick image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (pickerResult.canceled) return;
    setAvatarUploading(true);
    try {
      // Upload to Firebase Storage
      const storage = getStorage();
      const response = await fetch(pickerResult.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      // Update Firebase Auth profile
      await updateProfile(user, { photoURL: downloadURL });
      // Save avatar URL to Firestore user profile
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), { avatarUrl: downloadURL }, { merge: true });
      setAvatarUrl(downloadURL);
      Alert.alert('Avatar updated!');
    } catch (e) {
      Alert.alert('Error', 'Failed to update avatar.');
    } finally {
      setAvatarUploading(false);
    }
  };

  
  // Fetch weights on mount
  async function fetchWeights() {
    if (!user?.uid) return;
    setWeightChartLoading(true);
    try {
      const entries = await getUserWeightHistory(user.uid);
      // Sort by date
      entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setWeights(entries);
      // Set the most recent weight in weightInput
      if (entries.length > 0) {
        const latest = entries[entries.length - 1];
        setWeightInput(latest.weight.toString());
      } else {
        setWeightInput('');
      }
    } finally {
      setWeightChartLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;
    const fetchGoalWeightAndLowLimAndAvatar = async () => {
      if (user?.uid) {
        setGoalWeightLoading(true);
        const gw = await getUserGoalWeight(user.uid);
        const ll = await getUserLowLim(user.uid);
        // Fetch avatarUrl from Firestore
        const { getFirestore, doc, getDoc } = await import('firebase/firestore');
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        let avatarUrlFromDb = null;
        if (userSnap.exists()) {
          const data = userSnap.data();
          avatarUrlFromDb = data.avatarUrl || null;
        }
        if (isActive) {
          setGoalWeight(gw);
          setGoalWeightInput(gw !== null ? gw.toString() : '');
          setLowLim(ll);
          setAvatarUrl(avatarUrlFromDb);
          setGoalWeightLoading(false);
        }
      }
    };
    fetchGoalWeightAndLowLimAndAvatar();
    fetchWeights();
    return () => { isActive = false; };
  }, [user?.uid]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
    } catch (e: any) {
      setError(e.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await auth.signOut();
      
    } catch (e: any) {
      setError(e.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const handleLowLimit = (text: string) => {
    const val = parseFloat(text);
    if (!isNaN(val) && val > 0) {
      setLowLim(val.toString());
    } else {
      setLowLim('0');
    }
  };
  
  return (
    
    <ImageBackground source={user? matrixBg : loginBg} style={styles.background} resizeMode="cover">
      <ScrollView>    
      <View style={styles.container}>
       {user ? (
          <>                 {/* User avatar and username */}
             <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 20}}>
               <TouchableOpacity onPress={handleAvatarPress} disabled={avatarUploading}>
                 <Image
                   source={avatarUrl ? { uri: avatarUrl } : user.photoURL ? { uri: user.photoURL } : defaultAvatar}
                   style={{ width: 56, height: 56, borderRadius: 28, marginRight: 12, borderWidth: 2, borderColor: '#00e6e6', backgroundColor: '#eee', opacity: avatarUploading ? 0.5 : 1 }}
                 />
                 {avatarUploading ? (
                  <ActivityIndicator style={{position: 'absolute', left: 18, top: 18}} color="#00e6e6" />
                 ) : <></>}
               </TouchableOpacity>
               <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold', marginRight: 8}}>
                 {user.displayName ? user.displayName : (user.email || 'User')}
               </Text>
               <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', { userId })}>
                 <Text style={styles.buttonText}>Edit Profile</Text>
               </TouchableOpacity>
             </View>             
             {/* Historical Weights Chart */}
             <View style={{marginVertical: 0, backgroundColor: '#275075, 0.5f', borderRadius: 8, padding: 0, width: '100%'}}>
               <Text style={[styles.nutText, {marginBottom: 8, color: '#fff'}]}>Weight History</Text>
               {weightChartLoading ? (
                 <ActivityIndicator size="small" color="#7904a4" />
               ) : weights.length > 0 ? (
                <>
                 <LineChart
                   data={weights.map(w => ({
                     value: typeof w.weight === 'number' ? w.weight : parseFloat(w.weight),
                     label: w.date ? Moment(w.date).format('MM/DD') : '',
                     dataPointText: (typeof w.weight === 'number' ? w.weight : parseFloat(w.weight)).toString(),
                   }))}
                   thickness={2}
                   color="#7904a4"
                   hideDataPoints={false}
                   yAxisColor="#00e6e6"
                   xAxisColor="#c084fc"
                   curved
                   hideRules
                   isAnimated
                   noOfSections={4}
                   yAxisTextStyle={{color: '#00e6e6'}}
                   xAxisLabelTextStyle={{color: '#c084fc'}}
                   dataPointsColor="#c084fc"
                   dataPointsRadius={2}                   
                   height={180}
                   yAxisOffset={parseFloat(lowLim)}
                   textColor1="#fff"
                   width={350}
                 />  
                 {editingLowLim ? (
                  <>
                  <TextInput
                    style={[styles.input, { width: 80, marginRight: 8, backgroundColor: 'white', color: 'black' }]}
                    value={lowLim}
                    onChangeText={(text) => handleLowLimit(text)}
                    keyboardType="numeric"
                    autoFocus
                  />
                  <TouchableOpacity style={[styles.editButton, {marginRight: 4}]} onPress={async () => {
                    if (user?.uid) {
                      await setUserLowLim(user.uid, lowLim);
                    }
                    setEditingLowLim(false);
                  }}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => setEditingLowLim(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  </>
                 ):(
                  <>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditingLowLim(true)}>
                      <Text style={styles.buttonText}> Y Axis Low Limit: {lowLim}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditingLowLim(true)}>
                    <Text style={styles.buttonText}> X Axis Low Limit: {xAxisLowLim}</Text>
                    </TouchableOpacity>
                  </>
                  )
                  }                                
                 </>
               ) : (
                 <Text style={{color: '#fff'}}>No weight entries yet.</Text>
               )}
             </View>
             <View style={{margin: 10}}></View>
            <View style={{  alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.nutText}>Goal Weight: {goalWeight}</Text>
              {editingGoalWeight ? (
                <>
                  <TextInput
                    style={[styles.input, { width: 80, marginRight: 8, backgroundColor: 'white', color: 'black' }]}
                    value={goalWeightInput}
                    onChangeText={setGoalWeightInput}
                    keyboardType="numeric"
                    autoFocus
                  />
                  <TouchableOpacity style={[styles.editButton, {marginRight: 4}]} onPress={async () => {
                    const val = parseFloat(goalWeightInput);
                    if (!isNaN(val) && val > 0) {
                      setGoalWeightLoading(true);
                      await setUserGoalWeight(user.uid, val);
                      setGoalWeight(val);
                      setEditingGoalWeight(false);
                      setGoalWeightLoading(false);
                    }
                  }}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => {
                    setGoalWeightInput(goalWeight !== null ? goalWeight.toString() : '');
                    setEditingGoalWeight(false);
                  }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                 
                  <TouchableOpacity style={styles.editButton} onPress={() => setEditingGoalWeight(true)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </>
              )}
              {goalWeightLoading && <ActivityIndicator size="small" color="#7904a4" style={{marginLeft: 8}} />}
              {editingCurrentWeight ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                  <TextInput
                    style={[styles.input, { width: 80, marginRight: 8, backgroundColor: 'white', color: 'black' }]}
                    value={weightInput}
                    onChangeText={ (value) =>
                      setWeightInput(value)
                    }
                    keyboardType="numeric"
                    autoFocus
                  />
                  <TouchableOpacity style={[styles.editButton, {marginRight: 4}]} onPress={async () => {
                    const val = parseFloat(weightInput);
                    if (!isNaN(val) && val > 0) {                      
                      await addUserWeightEntry(user.uid, val, weightDate);
                      setEditingCurrentWeight(false);
                      // Fetch weights again after adding
                      fetchWeights();
                    }
                  }}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => setEditingCurrentWeight(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                <Text style={styles.nutText}>Current Weight: {weightInput}</Text>  
                  <TouchableOpacity style={styles.editButton} onPress={() => setEditingCurrentWeight(true)}>
                    <Text style={styles.buttonText}>Edit Current Weight</Text>
                  </TouchableOpacity>                
                </>
              )}
              <Text style={styles.nutText}>Date of Weight: {Moment(weightDate).format('MM DD YYYY')}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>Edit Date of Weight</Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={weightDate}
                  onChange={(event, date) => {
                    if (date) {
                      setWeightDate(date);
                      setShowDatePicker(false);
                    }
                  }}
                  minimumDate={new Date(2000, 0, 1)}
                  maximumDate={new Date()}
                />
              )}
              {goalWeightLoading && <ActivityIndicator size="small" color="#7904a4" style={{marginLeft: 8}} />}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <TouchableOpacity             
              style={styles.button}
              onPress={() => navigation.navigate('Main', { screen: 'Nutrition', params: { userId: user.uid } })}
            >
              <Text style={styles.buttonText}>Go to Nut</Text> 
            </TouchableOpacity>
            <Button
              title="Logout"
              onPress={handleLogout}
              color="#e74c3c"
            />
            </View>
          </>
          
        ) : (
          <>
            <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
            {showReg ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />                
                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>                               
                <TouchableOpacity style={styles.button} onPress={() => setShowReg(false)}>
                  <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setShowReg(true)}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </>
            )}
            {goalWeightLoading && <ActivityIndicator size="small" color="#7904a4" style={{marginLeft: 8}} />}          
          
        </>      
      ) }
       </View>
       </ScrollView>
    </ImageBackground>    
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
  },
  video: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  nutText: {
    color: '#fff',
    marginLeft: 0,
    marginRight: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    margin: 10,
  },
  videoStyle: {    
    height: '100%',
    width: '100%',
    position: 'absolute',
    //backgroundColor: 'rgba(121, 243, 14, 0.3)', // semi-transparent overlay for readability
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  editButton: {
    backgroundColor: '#9000f3',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom:8,
  },
  deleteButton: {
    backgroundColor: '#e86c6c',
    padding: 8,
    borderRadius: 4,
    marginBottom:8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },  
});

export default HomeScreen;