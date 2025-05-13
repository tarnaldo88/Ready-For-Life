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

function DrawerContent(props){
    //values used to determine if dark theme is active or not
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const { navigation, state, descriptors } = props;

    
    const [name, setName] = useState("name");
	const [isLog, setIsLog] = useState(true);
	const [isSign, setIsSign] = useState(true);
	const [userID, setUserID] = useState();

    return(
        <View style={{flex: 1}}>
			                {isLog ? (
                    <>
            <DrawerContentScrollView {...props}>
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
								150 lbs Left To Go
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
								navigation.navigate("MyWorkouts");
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
                {isSign ? (
                    <> 
                <Drawer.Section style={styleDrawContent.bottomDrawerSection}>
                    <DrawerItem 
                        con={({color, size}) => (
						<Icon name="exit-to-app" color={color} size={size} />
					)}
					label="Sign Out"
					onPress={() => {
						navigation.navigate("mainHome"); //Storage.logout(setUserID, setName,setIsLog);
					}} //set to nothing until we get the login/logout functions working
                    />
                </Drawer.Section>
                </>
                ):(            
                    <>
                    </> 
                )}
                </>
            ):(
                                <>
								<DrawerContentScrollView {...props}>
				<View style={styleDrawContent.drawerContent}>
					<View
						style={
							styleDrawContent.userInfoSection
						} /*View section for the user information*/
					>
						<View style={{flexDirection: "row", marginTop: 15}}>
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
						</View>
						<View>
							<View style={styleDrawContent.section}>
								<Paragraph
									style={[
										styleDrawContent.paragraph,
										styleDrawContent.caption
									]}
								>
									Workout Streak: 
								</Paragraph>
								<Caption style={styleDrawContent.caption}>
								8 Days In A Row!
								</Caption>
							</View>
							
						</View>
					</View>
					<Drawer.Section
						style={styleDrawContent.bottomDrawerSection}
					>
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
							label="My Nutrition"
							onPress={() => {
								navigation.navigate("MyNutrition");
							}}
						/>
					</Drawer.Section>
				
				</View>
			</DrawerContentScrollView>
					                    </>
                )}
		</View>        
	);
}

export {DrawerContent};