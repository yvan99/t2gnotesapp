import React from "react";
import { TextInput, View, Text } from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  required = false,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`border rounded-lg p-3 text-base min-h-[44px] ${
          error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        } ${multiline ? "text-top" : ""}`}
        accessibilityLabel={label}
        accessibilityRequired={required}
        accessibilityHint={error ? `Error: ${error}` : undefined}
      />
      {error && (
        <Text
          className="text-red-500 text-xs mt-1"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}
    </View>
  );
};
