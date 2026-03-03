import { Pressable, View, StyleSheet } from "react-native";
import { useState } from "react";

import ParallaxScrollView from "../../components/parallax-scroll-view";
import { ThemedText } from "../../components/themed-text";
import { days, schedule } from "../../constants/schedule";

export default function HomeScreen() {
  const [activeDay, setActiveDay] = useState("mon");
  const availableDays = days.filter(
    (day) => schedule[day.key] && schedule[day.key].length > 0,
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      title="Хичээлийн хуваарь"
    >
      <View style={styles.tabBar}>
        {availableDays.map((day) => (
          <Pressable
            key={day.key}
            onPress={() => setActiveDay(day.key)}
            style={[styles.tab, activeDay === day.key && styles.activeTab]}
          >
            <ThemedText>{day.label}</ThemedText>
          </Pressable>
        ))}
      </View>
      <View style={styles.container}>
        {schedule[activeDay]?.map((item, index) => (
          <View key={index} style={styles.tableContainer}>
            <ThemedText>{item.time}</ThemedText>
            <ThemedText>{item.subject}</ThemedText>
            <ThemedText>{item.type}</ThemedText>
            <ThemedText>{item.room}</ThemedText>
            <ThemedText>{item.teacher}</ThemedText>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableContainer: {
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  tab: {
    paddingVertical: 8,
  },

  activeTab: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#DCE5F4",
  },
});
