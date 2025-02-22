import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import AddEditNote from './screens/AddEditNote';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('Main');
    }, 2000); // 2-second splash screen
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (screen, note = null) => {
    setSelectedNote(note);
    setCurrentScreen(screen);
  };

  let ScreenComponent;
  if (currentScreen === 'Splash') ScreenComponent = <SplashScreen />;
  else if (currentScreen === 'Main')
    ScreenComponent = <MainScreen onNavigate={navigateTo} />;
  else if (currentScreen === 'AddEdit')
    ScreenComponent = <AddEditNote onNavigate={navigateTo} note={selectedNote} />;

  return <View style={styles.container}>{ScreenComponent}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
