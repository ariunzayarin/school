import React from "react";
import { StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { IconSymbol } from "./icon-symbol";
import ThemedText from "./textWithStyle";

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Сонгох",
  style,
}) {
  const normalized = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  const selectedIndex = normalized.findIndex((o) => o.value === value);

  return (
    <SelectDropdown
      data={normalized}
      defaultValueByIndex={selectedIndex >= 0 ? selectedIndex : undefined}
      onSelect={(item) => onChange(item.value)}
      renderButton={(selectedItem, isOpen) => (
        <View style={[styles.button, style]}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            {selectedItem?.label ?? placeholder}
          </ThemedText>
          <IconSymbol
            name={isOpen ? "chevron.up" : "chevron.down"}
            size={16}
            color="#333"
          />
        </View>
      )}
      renderItem={(item) => (
        <View style={[styles.item, item.value === value && styles.itemActive]}>
          <ThemedText
            style={[
              styles.itemText,
              item.value === value && styles.itemTextActive,
            ]}
          >
            {item.label}
          </ThemedText>
        </View>
      )}
      dropdownStyle={styles.dropdown}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  dropdown: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 180,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemActive: {
    backgroundColor: "#EEF3FD",
  },
  itemText: {
    fontSize: 15,
    color: "#333",
  },
  itemTextActive: {
    color: "#669AF2",
    fontWeight: "600",
  },
});
