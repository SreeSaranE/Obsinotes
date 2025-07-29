import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getAllNotes, createNote, Note } from '../database/notesDb';
import NoteItem from '../components/NoteItem';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchNotes = async () => {
    const allNotes = await getAllNotes();
    setNotes(allNotes);
  };

  const handleCreateNote = async () => {
    const newNoteId = await createNote('Untitled', '');
    fetchNotes();
    navigation.navigate('Editor', { noteId: newNoteId });
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#1e1e1e' : '#fff' }]}>
      <Text style={[styles.heading, { color: dark ? '#fff' : '#000' }]}>My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            isSelected={item.id === selectedNoteId}
            onPress={() => {
              setSelectedNoteId(item.id);
              navigation.navigate('Editor', { noteId: item.id });
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleCreateNote}>
        <Text style={styles.addButtonText}>+ New Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
