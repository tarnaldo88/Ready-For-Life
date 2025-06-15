import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import nutBg from '../img/loginBg.jpg';

const NutitrionScreen: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <ImageBackground source = {nutBg}  style={styles.background} resizeMode='cover'>
    <View >
      <Text >Welcome to Nut!</Text>
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
})

export default NutitrionScreen;

