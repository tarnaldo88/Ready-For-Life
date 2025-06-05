import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './HomeScreen'; // Assuming RootStackParamList is in HomeScreen or a shared types file

// Define the type for the route prop specific to ProfileScreen
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text>User ID: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;