import React from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  // Redirect to the main tab navigator, specifically the home tab
  return(
  <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
