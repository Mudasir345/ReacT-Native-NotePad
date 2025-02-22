import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEditNote = ({ onNavigate, note }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) setNotes(JSON.parse(storedNotes));
    };
    loadNotes();
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const saveNote = async () => {
    const id = note?.id || Date.now();
    const updatedNotes = note
      ? notes.map((n) => (n.id === id ? { id, title, content } : n))
      : [...notes, { id, title, content }];
    if (title === '' || content === '') {
      alert('Please fill in all fields');
      return;
    }
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    onNavigate('Main');
  };

  const home = () => {
    onNavigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Home Button */}
        <TouchableOpacity onPress={home} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Welcome to NotesApp</Text>
        <Text style={styles.subtitle}>Add or Update Your Notes Easily</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          placeholderTextColor="#aaa"
        />

        {/* Save Button */}
        <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9', // Light background for the entire screen
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#f9f9f9',
    marginTop: '20%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6200ee', // Vibrant purple for the title
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6200ee', // Matching subtitle color
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0288d1', // Blue border color for inputs
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  homeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#6200ee', // Vibrant purple button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  homeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#03dac5', // Teal green for the save button
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEditNote;