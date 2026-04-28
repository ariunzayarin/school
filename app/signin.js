import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Image from "../components/ui/image";
import TextInput from "../components/ui/textInput";
import Button from "../components/ui/button";
import Flex from "../components/ui/flex";
import ThemedText from "../components/ui/textWithStyle";
import { login as dbLogin } from "../database/auth";

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("И-мэйл хаягаа оруулна уу");
      return;
    }

    if (!password) {
      setError("Нууц үгээ оруулна уу");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const success = await dbLogin(email.trim().toLowerCase(), password);

      if (!success) {
        setError("Нэвтрэх мэдээлэл буруу байна");
        return;
      }

      // store session (simple)
      await AsyncStorage.setItem("isLoggedIn", "true");

      router.replace("/(tabs)");
    } catch (err) {
      setError("Алдаа гарлаа");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      full
      justifyCenter
      alignCenter
      gap={16}
      style={{
        height: "100%",
        backgroundColor: "#DCE5F4",
        padding: 50,
      }}
    >
      <Image
        url={require("../assets/images/logo.png")}
        width={220}
        height={100}
        contentFit="contain"
      />

      <Flex gap={12} style={{ width: "100%" }}>
        <TextInput
          placeholder="Цахим шуудан /и-майл/"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            setError("");
          }}
        />
        <TextInput
          placeholder="Нууц үг"
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            setError("");
          }}
          isPassword
        />

        {!!error && (
          <ThemedText type="error" style={{ paddingHorizontal: 4 }}>
            {error}
          </ThemedText>
        )}
      </Flex>

      <Button
        text="Нэвтрэх"
        onClick={handleLogin}
        isBlock
        size="lg"
        loading={loading}
      />
    </Flex>
  );
}
