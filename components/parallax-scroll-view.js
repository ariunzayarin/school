import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedView } from "./themed-view";
import ThemedText from "./ui/textWithStyle";
import { useThemeColor } from "../hooks/use-theme-color";
import { Notifications } from "./ui/notifWidget";

const HEADER_HEIGHT = 120;

export default function ParallaxScrollView({ children, title }) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      {title && (
        <Animated.View style={styles.header}>
          <ThemedText type="title">{title}</ThemedText>
          <Notifications />
        </Animated.View>
      )}

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
    padding: 20,
    gap: 16,
  },
});
