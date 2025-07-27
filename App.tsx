import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notes.db');

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function App() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT
        );`
      );
    });

    fetchNotes();
  }, []);

  const fetchNotes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM notes ORDER BY id DESC;',
        [],
        (_, { rows }) => setNotes(rows._array as Note[])
      );
    });
  };

  const createNote = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO notes (title, content) VALUES (?, ?);',
        ['Untitled', ''],
        (_, result) => {
          fetchNotes();
        }
      );
    });
  };

  const saveNote = (note: Note) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE notes SET content = ? WHERE id = ?;',
        [text, note.id],
        () => {
          fetchNotes();
        }
      );
    });
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={[
        styles.noteItem,
        {
          backgroundColor:
            selectedNote?.id === item.id ? '#444' : dark ? '#222' : '#eee',
        },
      ]}
      onPress={() => {
        setSelectedNote(item);
        setText(item.content);
      }}
    >
      <Text style={[styles.noteTitle, { color: dark ? '#fff' : '#000' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#1e1e1e' : '#fff' }]}>
      {/* Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: dark ? '#2b2b2b' : '#f0f0f0' }]}>
        <Text style={[styles.heading, { color: dark ? '#fff' : '#000' }]}>Notes</Text>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNoteItem}
        />
        <TouchableOpacity onPress={createNote} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ New Note</Text>
        </TouchableOpacity>
      </View>

      {/* Editor */}
      <View style={styles.editor}>
        {selectedNote ? (
          <>
            <Text style={[styles.editorTitle, { color: dark ? '#fff' : '#000' }]}>
              {selectedNote.title}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: dark ? '#1e1e1e' : '#fff',
                  color: dark ? '#fff' : '#000',
                },
              ]}
              multiline
              value={text}
              onChangeText={setText}
              onBlur={() => saveNote(selectedNote)}
              placeholder="Start typing..."
              placeholderTextColor={dark ? '#aaa' : '#666'}
            />
          </>
        ) : (
          <Text style={{ color: dark ? '#ccc' : '#666' }}>Select a note to begin editing.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#444',
    padding: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  noteItem: {
    padding: 8,
    marginBottom: 6,
    borderRadius: 4,
  },
  noteTitle: {
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#2196f3',
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  editor: {
    flex: 1,
    padding: 15,
  },
  editorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 6,
    textAlignVertical: 'top',
  },
});
