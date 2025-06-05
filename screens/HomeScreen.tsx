import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabs';

// Remove unused navigation types

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', { userId: '123' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;