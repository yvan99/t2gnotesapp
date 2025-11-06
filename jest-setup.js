/* eslint-disable no-undef */
import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Stack: {
    Screen: "Stack.Screen",
  },
  Tabs: {
    Screen: "Tabs.Screen",
  },
}));

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  requestCameraPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "mock-photo-uri" }],
    })
  ),
  launchCameraAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "mock-camera-uri" }],
    })
  ),
  MediaTypeOptions: {
    Images: "Images",
  },
}));

jest.mock("lucide-react-native", () => ({
  FileText: "FileText",
  PlusCircle: "PlusCircle",
  Settings: "Settings",
  Camera: "Camera",
  Image: "Image",
  X: "X",
  Trash2: "Trash2",
  Edit3: "Edit3",
  ArrowLeft: "ArrowLeft",
  RefreshCw: "RefreshCw",
}));

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});
