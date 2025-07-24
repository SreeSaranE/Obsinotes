import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import "@/storage/database"; // Auto-initialize DB on import

export default function App() {
  useEffect(() => {
    console.log("Obsinotes app started");
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
