import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  isBlock = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  style,
  textStyle,
  rounded = false,
}) {
  const isDisabled = disabled || loading;

  const containerStyles = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    isBlock && styles.block,
    iconOnly && styles[`iconOnly_${size}`],
    rounded && styles.rounded,
    isDisabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.label,
    styles[`label_${size}`],
    styles[`label_${variant}`],
    textStyle,
  ];

  const spinnerColor =
    variant === "outline" || variant === "simple" ? "#669AF2" : "#fff";

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.75}
      disabled={isDisabled}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <View style={styles.inner}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          {text && <Text style={labelStyles}>{text}</Text>}
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
  },

  size_sm: { height: 36, paddingHorizontal: 12 },
  size_md: { height: 48, paddingHorizontal: 20 },
  size_lg: { height: 57, paddingHorizontal: 28 },

  iconOnly_sm: { width: 36, paddingHorizontal: 0 },
  iconOnly_md: { width: 48, paddingHorizontal: 0 },
  iconOnly_lg: { width: 57, paddingHorizontal: 0 },

  variant_primary: {
    backgroundColor: "#669AF2",
  },
  // variant_secondary: {
  //   backgroundColor: "#E8EEFB",
  // },
  variant_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#669AF2",
  },
  variant_simple: {
    backgroundColor: "transparent",
  },
  // variant_danger: {
  //   backgroundColor: "#F54927",
  // },

  label: {
    fontWeight: "600",
  },
  label_sm: { fontSize: 13 },
  label_md: { fontSize: 15 },
  label_lg: { fontSize: 16 },

  label_primary: { color: "#fff" },
  // label_secondary: { color: "#669AF2" },
  label_outline: { color: "#669AF2" },
  label_simple: { color: "#669AF2" },
  // label_danger: { color: "#fff" },

  block: { width: "100%" },
  rounded: { borderRadius: 999 },
  disabled: { opacity: 0.45 },

  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
