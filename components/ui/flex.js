import React from "react";
import { View, StyleSheet } from "react-native";

export default function Flex({
  children,
  style,
  horizontal,
  justifyCenter,
  alignCenter,
  spaceBetween,
  full,
  gap,
  wrap,
  backgroundColor,
  isWhiteContainer,
}) {
  return (
    <View
      style={[
        horizontal && { flexDirection: "row" },
        justifyCenter && { justifyContent: "center" },
        alignCenter && { alignItems: "center" },
        spaceBetween && { justifyContent: "space-between" },
        full && { flex: 1 },
        gap != null && { gap },
        wrap && { flexWrap: "wrap" },
        backgroundColor && { backgroundColor },
        isWhiteContainer && styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});
