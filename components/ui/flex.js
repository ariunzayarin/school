import React from "react";
import { View } from "react-native";

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
        style,
      ]}
    >
      {children}
    </View>
  );
}
