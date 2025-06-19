import { StackScreenProps } from '@react-navigation/stack';
import { useVideoPlayer, VideoView } from 'expo-video';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { getUserGoalWeight, setUserGoalWeight } from '../app/userService';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import loginBg from '../img/loginBg.jpg';
import matrixBg from '../img/matrix.jpg';
import { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const videoSource1 = require('../img/video1.mp4');
const videoSource2 = require('../img/video2.mp4');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
  const [goalWeightLoading, setGoalWeightLoading] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

  const player = useVideoPlayer(videoSource1, (player) => {    
    player.staysActiveInBackground = true;
    player.playbackRate = 2;
    player.play();  
    player.loop = true;      
  });

  const player2 = useVideoPlayer(videoSource2, (player) => {   
    player.staysActiveInBackground = true;
    player.play();
    player.loop = true;
  });

  useEffect(() => {
    let isActive = true;
    const fetchGoalWeight = async () => {
      if (user?.uid) {
        setGoalWeightLoading(true);
        const gw = await getUserGoalWeight(user.uid);
        if (isActive) {
          setGoalWeight(gw);
          setGoalWeightInput(gw !== null ? gw.toString() : '');
          setGoalWeightLoading(false);
        }
      }
    };
    fetchGoalWeight();
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

  const handlePasswordMatch = () => {
    if (password.length < 6) 
    {
      setError('Password must be at least 6 characters long');
    }
    else if (confirmPassword !== password) 
    {
      setError('Passwords do not match');
    } 
    else 
    {      
      setError('');
    }
  };

  //videoVIEW  
  return (
    
    <ImageBackground source={user? matrixBg : loginBg} style={styles.background} resizeMode="cover">
      <ScrollView>
      <VideoView style={styles.videoStyle} player={player} nativeControls={false}/>
      <View style={styles.container}>
       {user ? (
          <>     
            <Text style={styles.title}>Welcome, {user.email}</Text>
            <LineChart data = {data} 
              yAxisColor="#0BA5A4"
              showVerticalLines
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#0BA5A4"
              color="#0BA5A4" 
              width = {300} 
              height = {200}  
              thickness={5}
              textColor= '#fff'
            />
            <View style={{margin: 10}}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.nutText}>Goal Weight: </Text>
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
                  <Text style={[styles.buttonText, {marginRight: 8}]}>{goalWeight !== null ? goalWeight : 'Not set'}</Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => setEditingGoalWeight(true)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </>
              )}
              {goalWeightLoading && <ActivityIndicator size="small" color="#7904a4" style={{marginLeft: 8}} />}
            </View>
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
                <Button title="Register" onPress={handleRegister} disabled={loading} />
                <Button title="Back to Login" onPress={() => setShowReg(false)} />
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
                <Button title="Login" onPress={handleLogin} disabled={loading} />
                <Button title="Register" onPress={() => setShowReg(true)} />
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
    padding: 20,
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
    width: '320%',
    position: 'absolute',
    //backgroundColor: 'rgba(121, 243, 14, 0.3)', // semi-transparent overlay for readability
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  editButton: {
    backgroundColor: '#6cc6e8',
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