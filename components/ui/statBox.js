import Flex from "./flex";
import ThemedText from "./textWithStyle";
import { StyleSheet } from "react-native";

export default function StatBox({ label, value }) {
  return (
    <>
      <Flex key={label} style={styles.statCard}>
        <ThemedText style={styles.statVal}>{value}</ThemedText>
        <ThemedText style={styles.statLabel}>{label}</ThemedText>
      </Flex>
    </>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statVal: {
    fontSize: 22,
    fontWeight: "300",
    color: "#2C2A26",
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 10,
    color: "#888780",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    textAlign: "center",
  },
});
