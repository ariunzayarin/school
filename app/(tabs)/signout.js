import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["userRole", "userToken"]);
    router.replace("/signin");
  };

  return (
    <View>
      <Text>Signing out...</Text>
    </View>
  );
}
