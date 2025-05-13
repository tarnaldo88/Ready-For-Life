/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firebase from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';
import { AuthProvider, useAuth } from './AuthContext';
import LoginScreen from './screens/LoginScreen';
import {DrawerContent} from './screens/DrawerContent';
import {createDrawerNavigator} from "@react-navigation/drawer";
import MainTabScreen from './screens/MainTabScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Drawer = createDrawerNavigator();

function AppDrawer() {
	return (
		<Drawer.Navigator   
			screenOptions={{
				headerShown:(false)
			}}
		  drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="Menu" component={MainTabScreen} />
		</Drawer.Navigator>
	);
}



function MainApp() {
  const { user, loading } = useAuth();

  if (loading) return null; // Optionally show a splash/loading screen

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <BottomTabs />}
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
