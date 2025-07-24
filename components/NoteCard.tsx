// components/NoteCard.tsx
import React from "react";
import { Card, Text } from "react-native-paper";
import { Note } from "@/storage/schema";

type Props = {
  note: Note;
  onPress: () => void;
};

const NoteCard = ({ note, onPress }: Props) => (
  <Card style={{ margin: 8 }} onPress={onPress}>
    <Card.Content>
      <Text variant="titleMedium">{note.title || "Untitled"}</Text>
      <Text variant="bodySmall" numberOfLines={2}>
        {note.content}
      </Text>
    </Card.Content>
  </Card>
);

export default NoteCard;
