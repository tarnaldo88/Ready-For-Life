import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import profileBg from '../img/profileBg.jpg';
import { RootStackParamList } from '../navigation/RootNavigator';

type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfileScreen: React.FC<EditProfileScreenProps> = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<EditProfileScreenProps['navigation']>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        setLoading(true);
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.uid]);

  const handleSave = async () => {
    if (!user?.uid) return;
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Please enter both first and last name.');
      return;
    }
    setLoading(true);
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { firstName, lastName }, { merge: true });
      Alert.alert('Profile updated!');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={profileBg} style={styles.background} resizeMode="cover">
      <Text style={styles.titleName}>
            {firstName} {lastName}
      </Text>
      <View style={styles.container}>        
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonReturn}
          onPress={() => navigation.navigate('Home')}
          disabled={loading}
        >
          <Text style={styles.btnReturnText}> Return Home </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

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
  },
  header: {
    width: '100%',
    backgroundColor: '#7904a4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 16,
  },
  titleName: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    fontSize: 38,
    marginBottom: 16,
    marginTop: 26,
    color: '#4b4e4a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#7904a4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonReturn: {
    backgroundColor: '#F0D5F3',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    width: '50%',
  },
  btnReturnText: {
    color: '#333233',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
