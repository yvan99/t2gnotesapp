import { NoteStatus } from "@/interfaces/notes.interface";
import React from "react";
import { View, Text } from "react-native";

interface StatusBadgeProps {
  status: NoteStatus;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

const statusColors = {
  Open: "bg-blue-100 border-blue-300 text-blue-800",
  "In Progress": "bg-yellow-100 border-yellow-300 text-yellow-800",
  Done: "bg-green-100 border-green-300 text-green-800",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
}) => {
  return (
    <View
      className={`rounded-full border ${sizeClasses[size]} ${statusColors[status]}`}
      accessibilityLabel={`Status: ${status}`}
    >
      <Text className={`font-medium ${statusColors[status].split(" ").pop()}`}>
        {status}
      </Text>
    </View>
  );
};
