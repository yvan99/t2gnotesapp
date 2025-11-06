import { StatusBadgeProps } from '@/interfaces/props.interface';
import { Text, View } from 'react-native';

const statusConfig = {
  Open: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Open' },
  'In Progress': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'In Progress' },
  Done: { bg: 'bg-green-100', text: 'text-green-700', label: 'Done' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <View className={`${config.bg} px-3 py-1 rounded-full`}>
      <Text className={`${config.text} text-xs font-semibold`}>
        {config.label}
      </Text>
    </View>
  );
}