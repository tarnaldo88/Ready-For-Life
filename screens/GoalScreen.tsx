import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Goals: undefined;
    GoalsList: undefined;
    CreateGoal: undefined;
};

type GoalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goals'>;
export default function GoalScreen() {
    const navigation = useNavigation<GoalScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Goals</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoalsList')}>
                <Text style={styles.buttonText}>View All Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateGoal')}>
                <Text style={styles.buttonText}>Create New Goal</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
    button: { backgroundColor: '#007BFF', padding: 10, marginVertical: 5, borderRadius: 5 },
    buttonText: { color: 'white', fontSize: 18 },
});