import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { notesStorage } from "@/storage/notes.storage";
import { Note } from "@/interfaces/notes.interface";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Trash2, Edit3, ArrowLeft } from "lucide-react-native";
import { showToast } from "@/utils/toast.util";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteForm } from "@/components/ui/NoteForm";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    if (!id) return;
    const loadedNote = await notesStorage.getNote(id);
    setNote(loadedNote);
    setLoading(false);
  };

  const handleUpdate = async (data: Partial<Note>) => {
    if (!id) return;
    const success = await notesStorage.updateNote(id, data);
    if (success) {
      showToast("Note updated successfully!", "success");
      setEditing(false);
      await loadNote();
    } else {
      showToast("Failed to update note", "error");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const success = await notesStorage.deleteNote(id);
    if (success) {
      showToast("Note deleted successfully", "success");
      router.back();
    } else {
      showToast("Failed to delete note", "error");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!note) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Note not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (editing) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <View className="px-4 py-3 border-b border-gray-200">
          <Pressable
            onPress={() => setEditing(false)}
            className="flex-row items-center active:opacity-70"
          >
            <ArrowLeft size={24} color="#374151" />
            <Text className="text-base font-semibold text-gray-700 ml-2">
              Cancel
            </Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            <NoteForm
              initialData={note}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
              onCancel={() => setEditing(false)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="px-4 py-3 border-b border-gray-200 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center active:opacity-70"
        >
          <ArrowLeft size={24} color="#374151" />
          <Text className="text-base font-semibold text-gray-700 ml-2">
            Back
          </Text>
        </Pressable>

        <Text className="text-base font-semibold text-gray-400">Details</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <Text className="text-2xl font-bold mb-2">{note.title}</Text>
            <Text className="text-gray-600 text-base leading-6">
              {note.description}
            </Text>
          </View>

          {note.photoUri && (
            <View className="mb-4 rounded-xl overflow-hidden">
              <Image
                source={{ uri: note.photoUri }}
                className="w-full h-64"
                resizeMode="cover"
              />
            </View>
          )}

          <View className="bg-gray-50 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-600">Status</Text>
              <StatusBadge status={note.status} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Last Updated</Text>
              <Text className="text-gray-900">
                {new Date(note.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-end mt-4 gap-2">
            <Pressable
              onPress={() => setEditing(true)}
              className="flex-row items-center bg-blue-500 p-2 rounded-lg active:opacity-70"
            >
              <Edit3 size={18} color="white" />
              <Text className="text-white font-semibold ml-2">Edit</Text>
            </Pressable>

            <Pressable
              onPress={handleDelete}
              className="flex-row items-center bg-red-500 p-2 rounded-lg active:opacity-70"
            >
              <Trash2 size={18} color="white" />
              <Text className="text-white font-semibold ml-2">Delete</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        destructive
      />
    </SafeAreaView>
  );
}
