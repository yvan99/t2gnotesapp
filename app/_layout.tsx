import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { notesStorage } from '@/storage/notes.storage';
import Toast from 'react-native-toast-message';
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    notesStorage.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="notes/[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
      <Toast />
    </GestureHandlerRootView>
  );
}