import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const GoalsListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      <Text>This is where the list of goals will be displayed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default GoalsListScreen;