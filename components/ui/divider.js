import React from "react";
import { StyleSheet, View } from "react-native";

export default function Divider({ vertical, margin, style }) {
  return (
    <View
      style={[
        styles.separator,
        style,
        vertical
          ? { width: 1 }
          : { marginVertical: margin ? margin : 12, height: 1 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#cecece",
  },
});
