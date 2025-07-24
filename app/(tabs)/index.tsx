import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import FloatingButton from "@/components/FloatingButton";
import NoteCard from "@/components/NoteCard";
import { getAllNotes } from "@/storage/database";
import { Note } from "@/storage/schema";

export default function HomeScreen() {
  const router = useRouter();
  const [notes, setNotes] = React.useState<Note[]>([]);

  // Fetch notes when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadNotes = async () => {
        const data = await getAllNotes();
        setNotes(data);
      };
      loadNotes();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push({ pathname: "/note/[id]", params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No notes found.</Text>}
      />

      <FloatingButton onPress={() => router.push("/note/new" as "/note/[id]")} />
    </View>
  );
}
