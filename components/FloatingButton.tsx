// components/FloatingButton.tsx
import React from "react";
import { FAB } from "react-native-paper";

type Props = {
  onPress: () => void;
};

const FloatingButton = ({ onPress }: Props) => (
  <FAB icon="plus" style={{ position: "absolute", right: 16, bottom: 16 }} onPress={onPress} />
);

export default FloatingButton;
