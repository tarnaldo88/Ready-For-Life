import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebaseConfig';
import { BottomTabParamList } from '../navigation/BottomTabs';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      // Optionally, navigate or update state
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.email}</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile', { userId: user.uid })}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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