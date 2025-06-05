import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabs';

type SettingsScreenProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>;
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ route }) => {
  const { userId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      {/* Add settings options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;