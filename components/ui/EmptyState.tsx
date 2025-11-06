import { View, Text } from 'react-native';
import { FileText } from 'lucide-react-native';

export function EmptyState() {
  return (
    <View className="items-center justify-center py-16">
      <FileText size={64} color="#d1d5db" />
      <Text className="text-xl font-semibold text-gray-400 mt-4">No notes yet</Text>
      <Text className="text-gray-400 text-center mt-2 px-8">
        Tap the Create tab to add your first note
      </Text>
    </View>
  );
}