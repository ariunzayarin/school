import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "../hooks/use-theme-color";
import { Notifications } from "./ui/notifWidget";

const HEADER_HEIGHT = 120;

export default function ParallaxScrollView({ children, title }) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <Animated.View style={styles.header}>
        <ThemedText type="title">{title}</ThemedText>
        <Notifications />
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    backgroundColor: "#DCE5F4",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    padding: 32,
    gap: 16,
    backgroundColor: "#fff",
  },
});
