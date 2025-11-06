import { View, Text, Pressable } from "react-native";
import { FileText, PlusCircle } from "lucide-react-native";
import { useRouter } from "expo-router";

export function EmptyState() {
  const router = useRouter();
  return (
    <View className="items-center justify-center py-16">
      <FileText size={80} color="#d1d5db" />
      <Text className="text-xl font-semibold text-gray-400 mt-4">
        No notes yet
      </Text>
      <Text className="text-gray-400 text-center mt-2 px-8">
        Tap the Create tab to add your first note
      </Text>
      <Pressable
        onPress={() => router.push("/(tabs)/create")}
        className="bg-blue-500 rounded-full p-3 shadow-sm active:opacity-70 mt-4"
      >
        <PlusCircle size={24} color="white" />
      </Pressable>
    </View>
  );
}
