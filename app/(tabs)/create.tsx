import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Pressable,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useNotes } from "@/hooks/useNotes.hook";
import { showToast } from "@/utils/toast.util";
import { CreateNoteData } from "@/interfaces/notes.interface";
import { NoteForm } from "@/components/ui/NoteForm";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateNoteScreen() {
  const router = useRouter();
  const { createNote } = useNotes();

  const handleCreate = async (data: CreateNoteData) => {
    const success = await createNote(data);
    if (success) {
      showToast("Note created successfully!", "success");
      router.push("/(tabs)");
    } else {
      showToast("Failed to create note", "error");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-2 border-b border-gray-200 flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center active:opacity-70"
            >
              <ArrowLeft size={24} color="#374151" />
              <Text className="text-base font-semibold text-gray-700 ml-2">
                Back
              </Text>
            </Pressable>
          </View>
          <NoteForm onSubmit={handleCreate} submitLabel="Create Note" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
