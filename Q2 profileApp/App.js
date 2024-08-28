import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ProfileCard from './Profile'; 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProfileCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
