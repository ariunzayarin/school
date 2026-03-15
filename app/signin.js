import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Image from "../components/ui/image";
import TextInput from "../components/ui/textInput";
import Button from "../components/ui/button";
import Flex from "../components/ui/flex";
import ThemedText from "../components/ui/textWithStyle";

const USE_API = false;

const AUTH_API_URL = "https://your-api.com/api/auth/login"; // TODO: replace with real endpoint

async function loginWithAPI(email, password) {
  const response = await fetch(AUTH_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Нэвтрэх үед алдаа гарлаа");
  }

  const data = await response.json();
  return data;
}

async function loginWithMock(email, password) {
  await new Promise((res) => setTimeout(res, 600));

  if (password !== "123") {
    throw new Error("Нэвтрэх мэдээлэл буруу байна");
  }

  const role = email.startsWith("t") ? "teacher" : "student";
  return { role, token: "mock-token-123" };
}

async function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  return USE_API
    ? loginWithAPI(normalizedEmail, password)
    : loginWithMock(normalizedEmail, password);
}

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
      const { role, token } = await login(email, password);

      await AsyncStorage.multiSet([
        ["userRole", role],
        ["userToken", token],
      ]);

      router.replace("/(tabs)");
    } catch (err) {
      setError(err.message || "Нэвтрэх үед алдаа гарлаа");
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
