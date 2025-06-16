import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import goalBg from '../img/medBg.jpg';

type RootStackParamList = {
    Goals: undefined;
    GoalsList: { userId: string };
    CreateGoal: { userId: string };
};

type GoalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goals'>;

export default function GoalScreen() {
    const { user } = useAuth();
    const userId = user?.uid || 'guest';
    const navigation = useNavigation<GoalScreenNavigationProp>();

    return (
        <ImageBackground source={goalBg} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <Text style={styles.title}>Goals</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoalsList', { userId })}>
                    <Text style={styles.buttonText}>View All Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateGoal', { userId })}>
                    <Text style={styles.buttonText}>Create New Goal</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center',  },
    title: { 
        fontSize: 44, 
        marginBottom: 20, 
        fontWeight: 'bold',
        color: 'gold', 
    },
    button: { backgroundColor: '#7904a4', padding: 10, marginVertical: 5, borderRadius: 5, alignItems: "center", },
    buttonText: { color: '#fff', fontSize: 18 },

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});