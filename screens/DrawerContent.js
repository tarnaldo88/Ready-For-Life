import React, {useState, useEffect} from "react";
import {View} from "react-native";
import {
	useTheme,
	Avatar,
	Drawer,
	Text,
	TouchableRipple,
	Switch
} from "react-native-paper";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {styleDrawContent} from "./Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function DrawerContent({props, navigation}){
    const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [isSign, setIsSign] = useState();
	const [userID, setUserID] = useState();

    return(
        <View>
            <DrawerContentScrollView >
                <View>
                    <View /*View section for the user information. Placeholder user IMG*/> 
                        <Avatar.Image
                            source={require("./../img/img_avatar.webp")}
							size={50}
                        />
                        <View
								style={{
									marginLeft: 15,
									flexDirection: "column"
								}}
							>
								<Title style={styleDrawContent.title}>
								{name}
								</Title>
								<Caption style={styleDrawContent.caption}>
								</Caption>
							</View>
                            <View style={styleDrawContent.section}>
								<Paragraph
									style={[
										styleDrawContent.paragraph,
										styleDrawContent.caption
									]}
								>
									Diet Goal:
								</Paragraph>
								<Caption style={styleDrawContent.caption}>
								11 lbs Left To Go
								</Caption>
							</View>
                    </View>
                    <Drawer.Section style={styleDrawContent.bottomDrawerSection}>
                               <DrawerItem
							icon={({color, size}) => (
								<Icon name="home" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								navigation.navigate("mainHome");
							}} //set to home until proper pages are setup
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="account"
									color={color}
									size={size}
								/>
							)}
							label="Account"
							onPress={() => {
								navigation.navigate("ProfileHome");
							}} //set to home until proper pages are setup
						/>
						
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="format-list-numbered"
									color={color}
									size={size}
								/>
							)}
							label="My Workouts"
							onPress={() => {
								navigation.navigate("MyWorkout");
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="food-variant"
									color={color}
									size={size}
								/>
							)}
							label="My Goals"
							onPress={() => {
								navigation.navigate( 'MyGoals' )}}
						/> 
                        <DrawerItem
							icon={({color, size}) => (
								<Icon
									name="food-variant"
									color={color}
									size={size}
								/>
							)}
							label="My Meals"
							onPress={() => {
								navigation.navigate( 'MyNutrition' )}}
						/>     
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export {DrawerContent};