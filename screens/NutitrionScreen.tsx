import { NutStackList } from '@/navigation/NutStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import nutBg from '../img/loginBg.jpg';

type Props = StackScreenProps<NutStackList, 'NutList'>;

const NutitrionScreen: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const navigation = useNavigation<StackNavigationProp<NutStackList, 'NutList'>>();

  return (
    <ImageBackground source = {nutBg}  style={styles.background} resizeMode='cover'>
    <View >
      <Text >Welcome to Nut!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateNut')}>
        <Text style={styles.buttonText}>Create New Food Item</Text>
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
  button: { backgroundColor: '#7904a4', padding: 10, marginVertical: 5, borderRadius: 5, alignItems: "center", },
  buttonText: { color: '#fff', fontSize: 18 },
})

export default NutitrionScreen;

