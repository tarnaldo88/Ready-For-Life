import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { useAuth } from '../context/AuthContext';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';

export type HomeStackList = {
    Home: { userId: string },
    EditProfile: { userId: string },
}

const Stack = createStackNavigator<HomeStackList>();

const HomeStackNavigator: React.FC = () => {
    const { user } = useAuth();
    const userId = user?.uid || 'guest';

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;