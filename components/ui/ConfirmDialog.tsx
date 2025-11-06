import { Modal, View, Text, Pressable } from "react-native";
import { AlertTriangle } from "lucide-react-native";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center p-4"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
          onPress={(e) => e.stopPropagation()}
        >
          {}
          <View className="items-center mb-4">
            <View
              className={`${destructive ? "bg-red-100" : "bg-blue-100"} rounded-full p-3`}
            >
              <AlertTriangle
                size={32}
                color={destructive ? "#ef4444" : "#3b82f6"}
              />
            </View>
          </View>

          {}
          <Text className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </Text>

          {}
          <Text className="text-base text-gray-600 text-center mb-6">
            {message}
          </Text>

          {}
          <View className="flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 bg-gray-200 py-3 rounded-lg active:opacity-70"
            >
              <Text className="text-center font-semibold text-gray-700">
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onConfirm();
                onCancel();
              }}
              className={`flex-1 py-3 rounded-lg active:opacity-70 ${
                destructive ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              <Text className="text-center font-semibold text-white">
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
