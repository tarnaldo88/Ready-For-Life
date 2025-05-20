import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet } from 'react-native';

function ProfileScreen(){
  let te = "asdfasfsgsdsfs";

  return(
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#038adc"
            name="airplane.departure"
            style={styles.headerImage}
          />
    }>
      <ThemedView>
        <IconSymbol
            size={100}
            color="#038adc"
            name="airplane.departure"
            //style={styles.headerImage}
          />
        <ThemedText>{te}</ThemedText>
        <IconSymbol
            size={310}
            color="#038adc"
            name="airplane.departure"
            //style={styles.headerImage}
          />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    //bottom: -90,
   // left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});


export default ProfileScreen;