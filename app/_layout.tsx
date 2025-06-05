import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-gesture-handler'; // IMPORTANT: Must be at the top
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        {/* You can add other stack screens here, e.g., for modals */}
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </GestureHandlerRootView>
  );
}
