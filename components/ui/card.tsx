import { Note } from "@/interfaces/notes.interface";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
}

const statusColors = {
  Open: "bg-blue-100 border-blue-300",
  "In Progress": "bg-yellow-100 border-yellow-300",
  Done: "bg-green-100 border-green-300",
};

const statusTextColors = {
  Open: "text-blue-800",
  "In Progress": "text-yellow-800",
  Done: "text-green-800",
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDescriptionSnippet = (description: string) => {
    return description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;
  };

  return (
    <TouchableOpacity
      className={`bg-white rounded-lg p-4 mb-3 border-l-4 ${
        statusColors[note.status]
      } border`}
      onPress={() => onPress(note)}
      accessibilityLabel={`Note: ${note.title}. Status: ${note.status}. Tap to view details.`}
      accessibilityRole="button"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text
          className="text-lg font-semibold flex-1 mr-2"
          numberOfLines={2}
          accessibilityLabel={`Title: ${note.title}`}
        >
          {note.title}
        </Text>
        <View
          className={`px-3 py-1 rounded-full border ${
            statusColors[note.status]
          }`}
          accessibilityLabel={`Status: ${note.status}`}
        >
          <Text
            className={`text-xs font-medium ${statusTextColors[note.status]}`}
          >
            {note.status}
          </Text>
        </View>
      </View>

      <Text
        className="text-gray-600 text-sm mb-3"
        numberOfLines={3}
        accessibilityLabel={`Description: ${note.description}`}
      >
        {getDescriptionSnippet(note.description)}
      </Text>

      {note.photoUri && (
        <View className="mb-3">
          <Image
            source={{ uri: note.photoUri }}
            className="w-20 h-20 rounded"
            accessibilityLabel="Attached photo"
          />
        </View>
      )}

      <Text
        className="text-gray-400 text-xs"
        accessibilityLabel={`Last updated: ${formatDate(note.updatedAt)}`}
      >
        Updated: {formatDate(note.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
};
