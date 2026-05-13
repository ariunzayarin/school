import { Text, StyleSheet } from "react-native";

export default function ThemedText({
  children,
  type = "default",
  style,
  ...rest
}) {
  return (
    <Text style={[styles.base, styles[type], style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  default: {},
  defaultSemiBold: {
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  caption: {
    fontSize: 12,
    color: "#888",
  },
  link: {
    color: "#669AF2",
    textDecorationLine: "underline",
  },
  error: {
    fontSize: 13,
    color: "#f70000",
  },
  success: {
    fontSize: 13,
    color: "#79DB3D",
  },
  warning: {
    fontSize: 13,
    color: "#F5A623",
  },
});
