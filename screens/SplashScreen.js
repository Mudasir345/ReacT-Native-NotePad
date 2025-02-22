import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* App Icon or Logo (Optional) */}
      <Image
        source={require('../assets/icon.png')} // Replace with your app icon or logo
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome to NotesApp</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your Personal Note-Taking Companion</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee', // Vibrant purple background
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 20, // Rounded corners for the logo
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0', // Light gray for the subtitle
    textAlign: 'center',
  },
});

export default SplashScreen;