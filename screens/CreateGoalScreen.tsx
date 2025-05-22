import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateGoalScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>
      <Text>This is where the form for creating a new goal will be.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CreateGoalScreen;