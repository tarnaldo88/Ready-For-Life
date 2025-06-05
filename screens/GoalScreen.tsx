import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    Goals: undefined;
    GoalsList: undefined;
    CreateGoal: undefined;
};

type GoalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goals'>;
export default function GoalScreen({ route }: { route: any }) {
    const navigation = useNavigation<GoalScreenNavigationProp>();
    const { userId } = route.params;

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