import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';

export interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onPress: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, isSelected, onPress }) => {
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.noteItem,
        {
          backgroundColor: isSelected
            ? dark
              ? '#555'
              : '#ddd'
            : dark
            ? '#2a2a2a'
            : '#f9f9f9',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.noteTitle, { color: dark ? '#fff' : '#000' }]}>
        {note.title || 'Untitled'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NoteItem;
    