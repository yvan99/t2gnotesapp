import { Tabs } from "expo-router";
import { FileText, PlusCircle, Settings } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          backgroundColor: "#ffffff",
          borderRadius: 24,
          height: 80,
       
          
          paddingHorizontal: 10,
          borderTopWidth: 0,

        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          borderRadius: 16,
          marginHorizontal: 4,
          paddingTop: 4,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          headerTitle: "My Notes",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FileText size={24} color={focused ? "#cc0000" : color} />
          ),
          tabBarActiveTintColor: "#cc0000",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerTitle: "New Note",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <PlusCircle size={24} color={focused ? "#cc0000" : color} />
          ),
          tabBarActiveTintColor: "#cc0000",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Settings size={24} color={focused ? "#cc0000" : color} />
          ),
          tabBarActiveTintColor: "#cc0000",
        }}
      />
    </Tabs>
  );
}