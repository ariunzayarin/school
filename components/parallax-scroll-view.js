import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedView } from "./themed-view";
import ThemedText from "./ui/textWithStyle";
import { useThemeColor } from "../hooks/use-theme-color";
import { Notifications } from "./ui/notifWidget";
import Button from "../components/ui/button";
import Flex from "./ui/flex";

const HEADER_HEIGHT = 110;

export default function ParallaxScrollView({
  children,
  title,
  backButtonOnClick,
  stickyContent,
}) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <Flex style={styles.header}>
        {title && <ThemedText type="title">{title}</ThemedText>}
        {backButtonOnClick && (
          <Button
            variant="simple"
            text="Буцах"
            iconLeft="chevron.left"
            onClick={backButtonOnClick}
          />
        )}
        <Notifications />
      </Flex>
      {stickyContent && <Flex>{stickyContent}</Flex>}

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
    backgroundColor: "#EEF1F8",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
    gap: 16,
  },
});
