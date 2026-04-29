import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { IconSymbol } from "../../components/ui/icon-symbol";

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

  const spinnerColor = variant === "outline" ? "#669AF2" : "#fff";

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
          {iconLeft && (
            <IconSymbol
              color="#333"
              style={styles.iconLeft}
              size={15}
              name={iconLeft}
            />
          )}
          {text && <Text style={labelStyles}>{text}</Text>}
          {iconRight && (
            <IconSymbol
              color="#333"
              style={styles.iconRight}
              size={15}
              name={iconRight}
            />
          )}
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
  variant_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
  },
  variant_simple: {
    backgroundColor: "transparent",
  },
  label: {
    fontWeight: "600",
  },
  label_sm: { fontSize: 13 },
  label_md: { fontSize: 15 },
  label_lg: { fontSize: 16 },

  label_primary: { color: "#fff" },
  label_outline: { color: "#000" },
  label_simple: { color: "#333" },

  block: { width: "100%" },
  rounded: { borderRadius: 999 },
  disabled: { opacity: 0.45 },

  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
