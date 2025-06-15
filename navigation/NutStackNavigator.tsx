import CreateNutitrionScreen from "@/screens/CreateNutScreen";
import EditExScreen from "@/screens/EditExScreen";
import EditNutScreen from "@/screens/EditNutScreen";
import NutitrionScreen from "@/screens/NutitrionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { useAuth } from '../context/AuthContext';

export type NutStackList = {
    NutList: undefined,
    ExList: undefined,

    EditNut: {nut: any},
    EditEx: {ex:any},
}

const Stack = createStackNavigator<NutStackList>();

const NutStackNavigator: React.FC = () => {
    const { user } = useAuth();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NutList" component={NutitrionScreen} />
            <Stack.Screen name="ExList" component={CreateNutitrionScreen} />
            <Stack.Screen name="EditNut" component={EditNutScreen} />
            <Stack.Screen name="EditEx" component={EditExScreen} />
        </Stack.Navigator>
    )
}