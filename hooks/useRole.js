import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("userRole")
      .then((r) => setRole(r))
      .finally(() => setLoading(false));
  }, []);

  return {
    role,
    isTeacher: role === "teacher",
    isStudent: role === "student",
    loading,
  };
}
