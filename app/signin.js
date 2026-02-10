import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, TextInput, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (password === "123") {
      if (normalizedEmail.startsWith("t")) {
        await AsyncStorage.setItem("userRole", "teacher");
      } else {
        await AsyncStorage.setItem("userRole", "student");
      }
    } else {
      alert("Invalid credentials");
    }
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
        placeholder={{ blurhash }}
        placeholderContentFit="contain"
        contentFit="contain"
        transition={1000}
      />
      <TextInput
        placeholder="Цахим шуудан /и-майл/"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Нууц үг"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.btn} onPress={handleLogin}>
        Hэвтрэх
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE5F4",
    flex: 1,
    justifyContent: "center",
    padding: 50,
    height: "100%",
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    height: 57,
  },
  image: { width: 200, height: 100, marginBottom: 20 },
  btn: {
    backgroundColor: "#669AF2",
    borderRadius: 8,
    color: "#fff",
    height: 57,
    textAlign: "center",
    padding: 20,
  },
});
