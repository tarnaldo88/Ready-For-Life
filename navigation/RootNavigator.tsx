import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import BottomTabs, { BottomTabParamList } from './BottomTabs';

export type RootStackParamList = {
  Home: { userId: string };
  Main: { screen?: keyof BottomTabParamList; params?: any } | undefined;
  EditProfile: { userId: string },
};
let Homeicon = '🏠';
let Nutritionicon = '🍽️';
let Goalsicon = '🎯';
let EditProfileicon = '👤';
let Logouticon = '🚪';
let MenuIcon = '🍔';
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const RootStack: React.FC = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

const DrawerContent: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerHeader}>{MenuIcon} Menu</Text>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          if (user) {
            navigation.navigate('App', { screen: 'Main', params: { screen: 'Home' } });
          } else {
            navigation.navigate('App', { screen: 'Home' });
          }
        }}
      >
        <Text style={styles.drawerItemText}>{Homeicon} Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          if (user) {
            navigation.navigate('App', { screen: 'Main', params: { screen: 'Nutrition' } });
          } else {
            navigation.navigate('App', { screen: 'Home' });
          }
        }}
      >
        <Text style={styles.drawerItemText}>{Nutritionicon} Nutrition</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          if (user) {
            navigation.navigate('App', { screen: 'Main', params: { screen: 'GoalsHome' } });
          } else {
            navigation.navigate('App', { screen: 'Home' });
          }
        }}
      >
        <Text style={styles.drawerItemText}>{Goalsicon} Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          if (user?.uid) {
            navigation.navigate('App', { screen: 'EditProfile', params: { userId: user.uid } });
          } else {
            navigation.navigate('App', { screen: 'Home' });
          }
        }}
      >
        <Text style={styles.drawerItemText}>{EditProfileicon} Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          try {
            await auth.signOut();
          } finally {
            navigation.closeDrawer();
            navigation.navigate('App', { screen: 'Home' });
          }
        }}
      >
        <Text style={styles.drawerItemText}>{Logouticon} Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const RootNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />, // hamburger
        headerStyle: { backgroundColor: '#111214' },
        headerTintColor: '#fff',
      }}
      drawerContent={(props: any) => <DrawerContent navigation={props.navigation} />}
    >
      <Drawer.Screen name="App" component={RootStack} options={{ headerTitle: 'Ready For Life' }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: '#1a1b1e',
  },
  drawerHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RootNavigator;
