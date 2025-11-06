import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { notesStorage } from "@/storage/notes.storage";
import { Trash2, RefreshCw } from "lucide-react-native";
import { showToast } from "@/utils/toast.util";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "@/hooks/useNotes.hook";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function SettingsScreen() {
  const { refreshNotes } = useNotes();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearAll = async () => {
    await notesStorage.clearAll();
    await notesStorage.initialize();
    await refreshNotes();
    showToast("All data cleared successfully", "success");
  };

  const handleReseed = async () => {
    await notesStorage.clearAll();
    await notesStorage.initialize();
    await refreshNotes();
    showToast("Data reseeded successfully", "success");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-lg font-semibold mb-4">Developer Options</Text>

          <Pressable
            onPress={handleReseed}
            className="flex-row items-center p-4 bg-blue-50 rounded-lg mb-3 active:opacity-70"
          >
            <RefreshCw size={24} color="#3b82f6" />
            <Text className="ml-3 text-blue-600 font-medium">
              Reseed Sample Data
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setShowClearDialog(true)}
            className="flex-row items-center p-4 bg-red-50 rounded-lg active:opacity-70"
          >
            <Trash2 size={24} color="#ef4444" />
            <Text className="ml-3 text-red-600 font-medium">
              Clear All Data
            </Text>
          </Pressable>
        </View>

        <View className="bg-white rounded-xl p-4">
          <Text className="text-sm text-gray-600">Version 1.0.0</Text>
        </View>
      </ScrollView>

      {}
      <ConfirmDialog
        visible={showClearDialog}
        title="Clear All Data"
        message="Are you sure you want to delete all notes? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={handleClearAll}
        onCancel={() => setShowClearDialog(false)}
        destructive
      />
    </SafeAreaView>
  );
}
