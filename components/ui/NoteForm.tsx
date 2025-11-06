import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { CreateNoteData, NoteStatus } from '@/interfaces/notes.interface';
import { usePhotoPicker } from '@/hooks/usePhotoPicker.hook';
import { validateNoteTitle } from '@/utils/validation.util';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';

interface NoteFormProps {
  initialData?: Partial<CreateNoteData>;
  onSubmit: (data: CreateNoteData) => void;
  submitLabel: string;
  onCancel?: () => void;
}

export function NoteForm({ initialData, onSubmit, submitLabel, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<NoteStatus>(initialData?.status || 'Open');
  const [photoUri, setPhotoUri] = useState(initialData?.photoUri);
  const [titleError, setTitleError] = useState('');

  const { pickPhoto, takePhoto, pickingPhoto } = usePhotoPicker();

  const handleSubmit = () => {
    const error = validateNoteTitle(title);
    if (error) {
      setTitleError(error);
      return;
    }

    onSubmit({ title: title.trim(), description: description.trim(), status, photoUri });
  };

  const handlePhotoPress = () => {
    Alert.alert('Add Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: async () => {
        const uri = await takePhoto();
        if (uri) setPhotoUri(uri);
      }},
      { text: 'Choose from Library', onPress: async () => {
        const uri = await pickPhoto();
        if (uri) setPhotoUri(uri);
      }},
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const statuses: NoteStatus[] = ['Open', 'In Progress', 'Done'];

  return (
    <View className="gap-4">
      {/* Title Input */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Title <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) setTitleError('');
          }}
          placeholder="Enter note title (2-80 characters)"
          className={`bg-gray-50 border ${titleError ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-base`}
          maxLength={80}
        />
        {titleError && (
          <Text className="text-red-500 text-sm mt-1">{titleError}</Text>
        )}
      </View>

      {/* Description Input */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Description</Text>
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

      {/* Status Selector */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Status</Text>
        <View className="flex-row gap-2">
          {statuses.map((s) => (
            <Pressable
              key={s}
              onPress={() => setStatus(s)}
              className={`flex-1 py-3 rounded-lg border-2 ${
                status === s
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-white border-gray-200'
              } active:opacity-70`}
            >
              <Text
                className={`text-center font-semibold ${
                  status === s ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Photo Picker */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Photo (Optional)</Text>
        {photoUri ? (
          <View className="relative">
            <Image source={{ uri: photoUri }} className="w-full h-48 rounded-lg" resizeMode="cover" />
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
              <Text className="text-gray-600 font-medium ml-2">Choose Photo</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3 mt-4">
        {onCancel && (
          <Pressable
            onPress={onCancel}
            className="flex-1 bg-gray-200 py-4 rounded-lg active:opacity-70"
          >
            <Text className="text-center font-semibold text-gray-700">Cancel</Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleSubmit}
          className="flex-1 bg-blue-500 py-4 rounded-lg active:opacity-70"
        >
          <Text className="text-center font-semibold text-white">{submitLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}