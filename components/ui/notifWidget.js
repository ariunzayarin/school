import { TouchableOpacity, View } from "react-native";

import { ThemedView } from "../themed-view";
import { IconSymbol } from "./icon-symbol";
import { useRouter } from "expo-router";

export function Notifications() {
  const router = useRouter();
  return (
    <ThemedView style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => router.replace("/notif")}
        activeOpacity={0.8}
      >
        <IconSymbol name="bell" size={26} weight="medium" color={"#333"} />
        <View
          style={{
            position: "absolute",
            top: -3,
            right: -3,
            backgroundColor: "#F54927",
            width: 10,
            height: 10,
            borderRadius: 5,
          }}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
