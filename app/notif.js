import React from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "../components/ui/icon-symbol";
import { ThemedText } from "../components/themed-text";
import { Notification } from "../components/ui/notif";

export default function Notifications() {
  const router = useRouter();

  return (
    <View
      style={{ backgroundColor: "#DCE5F4", height: "100%", paddingTop: 60 }}
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
        <Notification
          title="Хүн ба компьютерийн харилцааны зохиомж"
          content="Лаборатори 2: Сүүлийн хугацаа дөхөж байна"
          type="warning"
        />
        <Notification
          title="Хүн ба компьютерийн харилцааны зохиомж"
          content="Лаборатори 2: Сүүлийн хугацаа дөхөж байна"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCE5F4",
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
