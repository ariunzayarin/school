import { Tabs } from "expo-router";

import { HapticTab } from "../../components/haptic-tab";
import { IconSymbol } from "../../components/ui/icon-symbol";
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          height: 90,
          backgroundColor: "#DCE5F4",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Хуваарь",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: "Хичээл",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="books.vertical" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grade"
        options={{
          title: "Дүн",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chart.bar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signout"
        options={{
          title: "Гарах",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="rectangle.portrait.and.arrow.right"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
