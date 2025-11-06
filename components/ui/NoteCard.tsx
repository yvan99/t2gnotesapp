import { View, Text } from "react-native";
import { StatusBadge } from "./StatusBadge";
import { Camera } from "lucide-react-native";
import { NoteCardProps } from "@/interfaces/props.interface";

export function NoteCard({ note }: NoteCardProps) {
  const preview =
    note.description.slice(0, 100) +
    (note.description.length > 100 ? "..." : "");

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
      <View className="flex-row items-start justify-between mb-2">
        <Text className="text-lg font-semibold flex-1 pr-2" numberOfLines={2}>
          {note.title}
        </Text>
        {note.photoUri && <Camera size={20} color="#9ca3af" />}
      </View>

      <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
        {preview}
      </Text>

      <View className="flex-row items-center justify-between">
        <StatusBadge status={note.status} />
        <Text className="text-xs text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
