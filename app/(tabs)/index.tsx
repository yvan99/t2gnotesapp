import { FlatList, View, Text, RefreshControl, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useNotes } from "@/hooks/useNotes.hook";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NoteCard } from "@/components/ui/NoteCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlusCircle } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotesListScreen() {
  const router = useRouter();
  const { notes, loading, refreshNotes } = useNotes();

  useFocusEffect(
    useCallback(() => {
      refreshNotes();
    }, [refreshNotes])
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/notes/${item.id}`)}
              className="active:opacity-70"
            >
              <NoteCard note={item} />
            </Pressable>
          )}
          ListHeaderComponent={() => (
            <View className="mb-6">
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-2">
                    Techical notes
                  </Text>
                  <Text className="text-base text-gray-600">
                    {notes.length > 0 &&
                      `${notes.length} ${notes.length === 1 ? "note" : "notes"} in total`}
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push("/(tabs)/create")}
                  className="bg-blue-500 rounded-full p-3 shadow-sm active:opacity-70"
                >
                  <PlusCircle size={24} color="white" />
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refreshNotes}
              tintColor="#3b82f6"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}