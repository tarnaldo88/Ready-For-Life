import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';

const NutitrionScreen: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  return (
    <View >
      <Text >Welcome to Tab Navigator!</Text>
    </View>
  );
};

export default NutitrionScreen;