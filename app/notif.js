import React from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "../components/ui/icon-symbol";
import ThemedText from "../components/ui/textWithStyle";
import { Notification } from "../components/ui/notif";
import { notifications } from "../constants/schedule";

export default function Notifications() {
  const router = useRouter();

  return (
    <View
      style={{ backgroundColor: "#EEF1F8", height: "100%", paddingTop: 60 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          activeOpacity={0.8}
        >
          <IconSymbol
            name="chevron.left"
            size={18}
            weight="medium"
            color={"#333"}
          />
        </TouchableOpacity>
        <ThemedText type="title">Мэдэгдэл</ThemedText>
      </View>
      <View style={styles.container}>
        {notifications.map((notif) => (
          <Notification
            key={notif.title}
            title={notif.title}
            content={notif.content}
            type={notif.type}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EEF1F8",
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    height: "100%",
    paddingTop: 10,
    overflow: "scroll",
  },
});
