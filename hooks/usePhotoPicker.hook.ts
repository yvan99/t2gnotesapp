import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "@/utils/toast.util";

export const usePhotoPicker = () => {
  const [pickingPhoto, setPickingPhoto] = useState(false);

  const pickPhoto = async (): Promise<string | null> => {
    try {
      setPickingPhoto(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showToast("Camera roll permissions are required", "error");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error("Error picking photo:", error);
      showToast("Failed to pick photo", "error");
      return null;
    } finally {
      setPickingPhoto(false);
    }
  };

  const takePhoto = async (): Promise<string | null> => {
    try {
      setPickingPhoto(true);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        showToast("Camera permissions are required", "error");
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error("Error taking photo:", error);
      showToast("Failed to take photo", "error");
      return null;
    } finally {
      setPickingPhoto(false);
    }
  };

  return {
    pickPhoto,
    takePhoto,
    pickingPhoto,
  };
};
