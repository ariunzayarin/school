import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import ThemedText from "./textWithStyle";

export default function Tab({ tabItem, onChange, activeTabItem }) {
  return (
    <View style={styles.tabBar}>
      {tabItem.map((day) => (
        <Pressable
          key={day.key}
          onPress={() => onChange(day.key)}
          style={[styles.tab, activeTabItem === day.key && styles.activeTab]}
        >
          <ThemedText type={activeTabItem === day.key && "defaultSemiBold"}>
            {day.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeTab: {
    borderRadius: 8,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tab: {
    padding: 8,
  },
});
