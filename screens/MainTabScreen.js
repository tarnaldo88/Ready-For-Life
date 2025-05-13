import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import  {HomeStackScreen, CommunityStackScreen, ExerciseStackScreen, DietStackScreen} from "./StackNavigator";

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
	return(<Tab.Navigator initialRouteName="HomeStackScreen" activeColor="#fff" lazy={false}>
		<Tab.Screen
			name="HomeStackScreen"
			component={HomeStackScreen}
			options={{
				tabBarLabel: "Home",
				tabBarColor: "#c70212",
				tabBarIcon: ({color, size}) => (
					<Icon name="home" color={color} size={25} />
				)
			}}
		/>

		<Tab.Screen
			name="WorkoutHome"
			lazy={false}
			component={ExerciseStackScreen}
			options={{
				tabBarLabel: "Exercises",
				tabBarColor: "#04b043",
				tabBarIcon: ({color, size}) => (
					<Icon name="dumbbell" color={color} size={25} />
				)
			}}
		/>
		<Tab.Screen
			name="DietStackScreen"
			lazy={false}
			component={DietStackScreen}
			options={{
				tabBarLabel: "Nutrition",
				tabBarColor: "#1f65ff",
				tabBarIcon: ({color, size}) => (
					<Icon name="cards-heart" color={color} size={25} />
				)
			}}
		/>
		<Tab.Screen
			name="CommunityStackScreen"
			lazy={false}
			component={CommunityStackScreen}
			options={{
				tabBarLabel: "Community",
				tabBarColor: "#694fad",
				tabBarIcon: ({color, size}) => (
					<Icon name="contacts" color={color} size={25} />
				)
			}}
		/>
	</Tab.Navigator>)
};

export default MainTabScreen;
