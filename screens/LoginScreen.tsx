import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import { useAuth } from '../AuthContext';

const LoginScreen: React.FC = () => {
  // const { signIn, register, loading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSignIn = async () => {
    setError('');
    try {
      // await signIn(email, password);
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
    }
  };

  const handleRegister = async () => {
    // setError('');
    // try {
    //   await register(email, password);
    // } catch (e: any) {
    //   setError(e.message || 'Failed to register');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Register' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="small" color="#6200ee" />
      ) : isRegister ? (
        <Button title="Register" onPress={handleRegister} />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}
      <Text
        style={styles.toggle}
        onPress={() => {
          setIsRegister(!isRegister);
          setError('');
        }}
      >
        {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  toggle: {
    color: '#6200ee',
    marginTop: 24,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default LoginScreen;