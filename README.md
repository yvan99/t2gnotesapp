# 📝 Technical Tasks Note App

[![Demonstration Video](https://img.shields.io/badge/📺_Watch-Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://your-demo-video-link-here)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A beautiful and intuitive React Native task management app built with Expo for organizing your technical tasks and notes. Stay productive with a clean interface and powerful features.

## ✨ Features

- **📝 Create & Manage Notes** - Add, edit, and delete technical tasks with ease
- **🏷️ Status Tracking** - Mark tasks as pending, in progress, or completed
- **🖼️ Photo Attachments** - Add images to your notes using device camera or gallery
- **💾 Local Storage** - Data persists locally on your device using AsyncStorage
- **🎨 Beautiful UI** - Clean, modern interface styled with NativeWind (Tailwind CSS)
- **🔍 Empty State Handling** - Helpful UI when no tasks exist
- **✅ Form Validation** - Client-side validation for data integrity
- **🎭 Loading States** - Visual feedback during async operations
- **🧪 Comprehensive Testing** - Unit and integration tests included

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** - Install globally with `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio Emulator**

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yvan99/t2gnotesapp.git
   cd t2gnotesapp
```

2. **Install dependencies**
```bash
   npm install --legacy-peer-deps
```

3. **Start the development server**
```bash
   npx expo start
```

4. **Run the app**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your physical device

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure
```
t2gnotesapp/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab-based navigation group
│   │   ├── _layout.tsx          # Tab navigator configuration
│   │   ├── index.tsx            # Home screen (notes list)
│   │   ├── create.tsx           # Create new note screen
│   │   └── settings.tsx         # Settings screen
│   ├── notes/
│   │   └── [id].tsx             # Dynamic route for note details/edit
│   └── _layout.tsx              # Root layout with navigation setup
│
├── components/                   # Reusable UI components
│   └── ui/
│       ├── ConfirmDialog.tsx    # Confirmation modal for destructive actions
│       ├── EmptyState.tsx       # Empty state placeholder component
│       ├── LoadingSpinner.tsx   # Loading indicator component
│       ├── NoteCard.tsx         # Individual note card component
│       ├── NoteForm.tsx         # Form for creating/editing notes
│       └── StatusBadge.tsx      # Visual status indicator component
│
├── hooks/                        # Custom React hooks
│   ├── useNotes.hook.ts         # Hook for notes CRUD operations
│   └── usePhotoPicker.hook.ts   # Hook for image picker functionality
│
├── interfaces/                   # TypeScript type definitions
│   ├── notes.interface.ts       # Note entity interfaces
│   └── props.interface.ts       # Component props interfaces
│
├── storage/                      # Data persistence layer
│   └── notes.storage.ts         # AsyncStorage operations for notes
│
├── utils/                        # Utility functions
│   ├── toast.util.ts            # Toast notification helpers
│   └── validation.util.ts       # Form validation functions
│
├── constants/                    # App-wide constants
│   └── colors.constant.ts       # Color palette definitions
│
├── seeds/                        # Mock data for development
│   └── notes.seed.ts            # Sample notes data
│
├── __tests__/                    # Test suite
│   ├── components/              # Component tests
│   ├── hooks/                   # Custom hooks tests
│   ├── integration/             # Integration tests
│   ├── storage/                 # Storage layer tests
│   └── utils/                   # Utility function tests
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── jest-setup.js                 # Jest testing setup
└── README.md                     # Project documentation
```

## 🗂️ Detailed File Explanations

### 📱 App Directory (`app/`)

**File-based routing powered by Expo Router**

- **`_layout.tsx`** - Root layout wrapper that sets up navigation container and global providers
- **`(tabs)/_layout.tsx`** - Configures bottom tab navigation with icons and styling
- **`(tabs)/index.tsx`** - Home screen displaying all notes in a scrollable list
- **`(tabs)/create.tsx`** - Form screen for creating new notes with photo attachment
- **`(tabs)/settings.tsx`** - Settings and preferences screen
- **`notes/[id].tsx`** - Dynamic route for viewing and editing individual notes by ID

### 🧩 Components (`components/ui/`)

**Reusable UI building blocks**

- **`NoteCard.tsx`** - Displays note preview with title, snippet, status badge, and photo thumbnail
- **`NoteForm.tsx`** - Form component with validation for note creation and editing
- **`StatusBadge.tsx`** - Color-coded badge showing note status (pending/in-progress/completed)
- **`EmptyState.tsx`** - Friendly placeholder shown when no notes exist
- **`LoadingSpinner.tsx`** - Animated loading indicator for async operations
- **`ConfirmDialog.tsx`** - Modal dialog for confirming destructive actions like deletion

### 🎣 Hooks (`hooks/`)

**Custom React hooks for business logic**

- **`useNotes.hook.ts`** - Manages notes state and CRUD operations (create, read, update, delete)
- **`usePhotoPicker.hook.ts`** - Handles image selection from camera or gallery with permissions

### 📦 Storage (`storage/`)

**Data persistence layer**

- **`notes.storage.ts`** - AsyncStorage wrapper for saving/loading notes from device storage

### 🛠️ Utils (`utils/`)

**Helper functions**

- **`validation.util.ts`** - Form validation logic (required fields, max length, etc.)
- **`toast.util.ts`** - Toast notification utilities for user feedback

### 🎨 Constants (`constants/`)

- **`colors.constant.ts`** - Centralized color palette for consistent theming

### 📝 Interfaces (`interfaces/`)

**TypeScript type safety**

- **`notes.interface.ts`** - Note entity types (Note, NoteStatus, CreateNoteDTO, etc.)
- **`props.interface.ts`** - Component prop type definitions

### 🌱 Seeds (`seeds/`)

- **`notes.seed.ts`** - Sample data for development and testing purposes

### 🧪 Tests (`__tests__/`)

**Comprehensive test coverage**

- **`components/`** - Component rendering and interaction tests
- **`hooks/`** - Custom hook behavior tests
- **`storage/`** - Storage layer tests with mocked AsyncStorage
- **`utils/`** - Utility function unit tests
- **`integration/`** - End-to-end user flow tests

## 🛠️ Tech Stack

- **[React Native](https://reactnative.dev/)** - Mobile framework
- **[Expo](https://expo.dev/)** - Development platform
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based navigation
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Local data persistence
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** - Photo selection
- **[Jest](https://jestjs.io/)** - Testing framework
- **[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)** - Component testing
## 📄 Available Scripts
```bash
# Start development server
npm start

# Start on iOS
npm run ios

# Start on Android
npm run android

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Type checking
npx tsc --noEmit

# Lint code (if ESLint configured)
npm run lint
```

## 🔐 Permissions

The app requires the following permissions:

- **📷 Camera Access** - To take photos for notes
- **🖼️ Photo Library Access** - To select existing photos

These are requested at runtime when the user attempts to add a photo.

## 🧪 Testing Strategy

- **Unit Tests** - Individual functions and hooks
- **Component Tests** - UI component rendering and interaction
- **Integration Tests** - Complete user workflows
- **Storage Tests** - Data persistence verification
- **Mocked Dependencies** - Isolated test environments

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

ISHIMWE Yvan - [GitHub](https://github.com/yvan99)

## 🙏 Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)

---

Made with ❤️ using React Native and Expo