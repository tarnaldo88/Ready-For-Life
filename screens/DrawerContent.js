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
                    </View>
                    <Drawer.Section style={styleDrawContent.bottomDrawerSection}>

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export {DrawerContent};