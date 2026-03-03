import React from "react";
import { TextInput as Input, StyleSheet } from "react-native";

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  style,
  full,
  ...rest
}) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      autoCapitalize={isPassword ? "none" : "sentences"}
      style={[styles.input, full && { flex: 1 }, style]}
      placeholderTextColor="#999"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    height: 55,
    borderRadius: 8,
    fontSize: 16,
  },
});
