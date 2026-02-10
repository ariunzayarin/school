import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userRole");
    router.replace("/signin");
  };

  return (
    <View>
      <Text>Signing out...</Text>
    </View>
  );
}
