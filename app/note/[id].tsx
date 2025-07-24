import { useLocalSearchParams, useRouter } from "expo-router";
import { View, TextInput, StyleSheet, Alert, Platform } from "react-native";
import { useEffect, useState } from "react";
import { getNoteById, saveNote } from "@/storage/database";
import { Note } from "@/storage/schema";
import uuid from "react-native-uuid";
import { Appbar } from "react-native-paper";

export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState(id ?? "");
  const [isNew, setIsNew] = useState(id === "new");

  useEffect(() => {
    if (!id || id === "new") {
      const newId = uuid.v4() as string;
      setNoteId(newId);
      setIsNew(true);
      return;
    }

    const existing = getNoteById(id);
    if (existing) {
      setTitle(existing.title ?? "");
      setContent(existing.content ?? "");
    }
  }, [id]);

  const handleSave = () => {
    const now = Date.now();
    const note: Note = {
      id: noteId,
      title: title.trim() || "Untitled Note",
      content,
      createdAt: isNew ? now : getNoteById(noteId)?.createdAt ?? now,
      updatedAt: now,
      synced: false,
    };

    saveNote(id, title, content, new Date().toISOString());
    router.back();
  };

  useEffect(() => {
    // Save automatically on unmount (optional)
    return () => {
      if (title.trim() || content.trim()) {
        handleSave();
      }
    };
  }, [title, content]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleSave} />
        <Appbar.Content title={isNew ? "New Note" : "Edit Note"} />
        {Platform.OS !== "web" && <Appbar.Action icon="check" onPress={handleSave} />}
      </Appbar.Header>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Start writing your note in markdown..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.contentInput}
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "600",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#fff",
  },
  contentInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#ddd",
    textAlignVertical: "top",
  },
});
