import { usePhotoPicker } from "@/hooks/usePhotoPicker.hook";
import { NoteStatus } from "@/interfaces/notes.interface";
import { NoteFormProps } from "@/interfaces/props.interface";
import { validateNoteTitle } from "@/utils/validation.util";
import {
  Camera,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Loader,
  X,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export function NoteForm({
  initialData,
  onSubmit,
  submitLabel,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<NoteStatus>(
    initialData?.status || "Open"
  );

  const statuses = [
    {
      label: "Open" as NoteStatus,
      icon: Clock,
      colors: {
        bg: "#FEF3C7",
        border: "#FACC15",
        text: "#92400E",
      },
    },
    {
      label: "In Progress" as NoteStatus,
      icon: Loader,
      colors: {
        bg: "#DBEAFE",
        border: "#3B82F6",
        text: "#1E40AF",
      },
    },
    {
      label: "Done" as NoteStatus,
      icon: CheckCircle2,
      colors: {
        bg: "#DCFCE7",
        border: "#22C55E",
        text: "#166534",
      },
    },
  ];

  const [photoUri, setPhotoUri] = useState(initialData?.photoUri);
  const [titleError, setTitleError] = useState("");
  const { pickPhoto, takePhoto, pickingPhoto } = usePhotoPicker();

  const handleSubmit = () => {
    const error = validateNoteTitle(title);
    if (error) {
      setTitleError(error);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      photoUri,
    });
  };

  const handlePhotoPress = () => {
    Alert.alert("Add Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const uri = await takePhoto();
          if (uri) setPhotoUri(uri);
        },
      },
      {
        text: "Choose from Library",
        onPress: async () => {
          const uri = await pickPhoto();
          if (uri) setPhotoUri(uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View className="gap-4">
      {}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Title <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) setTitleError("");
          }}
          placeholder="Enter note title (2-80 characters)"
          className={`bg-gray-50 border ${titleError ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 text-base`}
          maxLength={80}
        />
        {titleError && (
          <Text className="text-red-500 text-sm mt-1">{titleError}</Text>
        )}
      </View>

      {}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Description
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter note description (up to 2000 characters)"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base h-32"
          maxLength={2000}
        />
        <Text className="text-xs text-gray-500 mt-1 text-right">
          {description.length}/2000
        </Text>
      </View>

      {}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Status</Text>
        <View className="flex-row gap-2">
          {statuses.map(({ label, icon: Icon, colors }) => {
            const isActive = status === label;
            return (
              <Pressable
                key={label}
                onPress={() => setStatus(label)}
                className="flex-1 py-3 rounded-lg border-2 flex-row items-center justify-center active:opacity-70"
                style={{
                  backgroundColor: isActive ? colors.bg : "#FFFFFF",
                  borderColor: isActive ? colors.border : "#E5E7EB",
                }}
              >
                <Icon
                  size={18}
                  color={isActive ? colors.text : "#6B7280"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    color: isActive ? colors.text : "#4B5563",
                    fontWeight: "600",
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Photo (Optional)
        </Text>
        {photoUri ? (
          <View className="relative">
            <Image
              source={{ uri: photoUri }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
            <Pressable
              onPress={() => setPhotoUri(undefined)}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-2 active:opacity-70"
            >
              <X size={20} color="white" />
            </Pressable>
          </View>
        ) : (
          <View className="flex-row gap-2">
            <Pressable
              onPress={handlePhotoPress}
              disabled={pickingPhoto}
              className="flex-1 flex-row items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg py-4 active:opacity-70"
            >
              <Camera size={24} color="#6b7280" />
              <Text className="text-gray-600 font-medium ml-2">Take Photo</Text>
            </Pressable>

            <Pressable
              onPress={async () => {
                const uri = await pickPhoto();
                if (uri) setPhotoUri(uri);
              }}
              disabled={pickingPhoto}
              className="flex-1 flex-row items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg py-4 active:opacity-70"
            >
              <ImageIcon size={24} color="#6b7280" />
              <Text className="text-gray-600 font-medium ml-2">
                Choose Photo
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {}
      <View className="flex-row gap-3 mt-4">
        {onCancel && (
          <Pressable
            onPress={onCancel}
            className="flex-1 bg-gray-200 py-4 rounded-lg active:opacity-70"
          >
            <Text className="text-center font-semibold text-gray-700">
              Cancel
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleSubmit}
          className="flex-1 bg-blue-500 py-4 rounded-lg active:opacity-70"
        >
          <Text className="text-center font-semibold text-white">
            {submitLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
