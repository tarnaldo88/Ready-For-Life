import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Defines the parameters for the stack navigator primarily managing Home and Profile screens
export type HomeStackParamList = {
  HomeFeed: undefined; // Renamed from 'Home' to avoid conflict with tab name, will map to index.tsx
  Profile: { userId: string };
};

// Type for navigation prop in components within this stack
export type HomeStackNavigatorProp<T extends keyof HomeStackParamList> = StackNavigationProp<HomeStackParamList, T>;

// Type for route prop in components within this stack
export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<HomeStackParamList, T>;
