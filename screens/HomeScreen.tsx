import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebaseConfig';
import { BottomTabParamList } from '../navigation/BottomTabs';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [showReg, setShowReg] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
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
      setUser(userCredential.user);
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
      setUser(null);
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

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.email}</Text>
        <Button
          title="Go to Nut"
          onPress={() => navigation.navigate('Nutrition', { userId: user.uid })}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#e74c3c"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        </>
      ) }
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isRegister ? (        
        <Button
          title={loading ? 'Registering...' : 'Register'}
          onPress={ () => {
            handleRegister();
            handlePasswordMatch();
          }}
          disabled={loading}
        />
      ) : (
        <Button
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
      )}
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      <Button
        title={isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        onPress={() => {
          setShowReg(!showReg);
          setIsRegister(!isRegister);                  
          setError('');
        }}
        color="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2f9af',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
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
});

export default HomeScreen;