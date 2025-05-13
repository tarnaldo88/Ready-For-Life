import * as React from "react";
import HomeScreen from "./HomeScreen";
import NutitrionScreen from "./NutitrionScreen";
import GoalScreen from "./GoalScreen";
import WorkoutScreen from "./WorkoutScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";


const HomeStackScreen = ({navigation}) => {
	return(
        <HomeStack.Navigator
            initialRouteName="mainHome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#c70212"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >            
            <HomeStack.Screen
                name="mainHome"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />           
            
            <HomeStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
           
            <HomeStack.Screen
                name="ProfileHome"
                component={ProfileScreen}
                options={{
                    title: "My Account",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <HomeStack.Screen
                name="MyWorkouts"
                component={WorkoutScreen}
                options={{
                    title: "My Workouts",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />                   
            <HomeStack.Screen
                name="MyNutrition"
                component={NutitrionScreen}
                options={{
                    title: "My Meals",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />   
            <HomeStack.Screen
                name="MyGoals"
                component={GoalScreen}
                options={{
                    title: "My Progress",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />         
        </HomeStack.Navigator>
    );
};

const ExerciseStackScreen = ({navigation}) => {
    return(
        <ExerciseStack.Navigator
                initialRouteName="Exercise"
                screenOptions={{
                    lazy: false,
                    headerStyle: {
                        backgroundColor: "#04b043"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
        >
            <ExerciseStack.Screen
                name="Exercise"
                component={WorkoutHomeScreen}
                options={{
                    title: "Exercise",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
    
            <ExerciseStack.Screen
                name="ExerciseList"
                component={ExerciseList}
                options={{
                    title: "Exercise Selector",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
    
            <ExerciseStack.Screen
                name="ExerciseDisplay"
                component={ExerciseDisplay}
                options={{
                    title: "Exercise Selector",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="ExercisesBodyFront"
                component={ExercisesBodyFrontScreen}
                options={{
                    title: "Select Area",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineHome"
                component={RoutineHomeScreen}
                options={{
                    title: "Routines",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineSelectGenerate"
                component={RoutineSelectGenerate}
                options={{
                    title: "Routine Generator",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineDisplayGenerated"
                component={RoutineDisplayGenerated}
                options={{
                    title: "Routine Generated",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />		
            <ExerciseStack.Screen
                name="DisplayMyRoutines"
                component={DisplayMyRoutines}
                options={{
                    title: "Your Routine",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="DisplayExDontGOHere"
                component={DisplayExButton}
                options={{
                    title: "Routine Generated",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
        </ExerciseStack.Navigator>
    );
};

const DietStackScreen = ({navigation}) => {
    return(
        <DietStack.Navigator
            initialRouteName="Diet"
            screenOptions={{
                lazy: false,
                headerStyle: {
                    backgroundColor: "#1f65ff"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >
            <DietStack.Screen
                name="Diet"
                component={DietHomeScreen}
                options={{
                    title: "Nutrition",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="nutJournal"
                component={NutJournal}
                options={{
                    title: "Nutrition Journal",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="createDiet"
                component={CreateNutrition}
                options={{
                    title: "Enter Your Food",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="todayNut"
                component={TodayNut}
                options={{
                    title: "Today's Journal",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />                
        </DietStack.Navigator>
    );
};

export {HomeStackScreen, ExerciseStackScreen, DietStackScreen};