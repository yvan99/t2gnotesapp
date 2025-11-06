import Toast from "react-native-toast-message";

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  Toast.show({
    type: type,
    text1: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
    text2: message,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
}

export function showConfirmToast(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 5000,
    autoHide: false,
    topOffset: 60,
    onPress: () => {
      Toast.hide();
      onConfirm();
    },
  });
}
