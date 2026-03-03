import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export function Notification({ title, content, type }) {
  const color = type === "warning" ? "#F54927" : "#79DB3D";
  return (
    <View style={styles.content}>
      <View style={[styles.widget, { backgroundColor: color }]} />
      <View style={styles.body}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <ThemedText>{content}</ThemedText>
        <ThemedText style={styles.timestamp}>2025/02/24 12:00:00</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    minHeight: 30,
    overflow: "hidden",
    borderLeftWidth: 4,
    borderLeftColor: "transparent", // overridden per instance via widget
  },
  widget: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 20,
    gap: 4,
  },
  timestamp: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },
});
