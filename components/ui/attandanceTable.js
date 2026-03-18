import React from "react";
import { StyleSheet } from "react-native";
import ThemedText from "./textWithStyle";
import Flex from "./flex";

export default function AttendanceTable({ attendance }) {
  const haveLab = attendance.laboratory?.length > 0;
  const haveSem = attendance.seminar?.length > 0;

  const weekCount = Math.max(
    attendance.lecture?.length ?? 0,
    attendance.laboratory?.length ?? 0,
    attendance.seminar?.length ?? 0,
  );

  const weeks = Array.from({ length: weekCount }, (_, i) => i);

  return (
    <Flex>
      <Flex horizontal style={styles.headerRow}>
        <ThemedText style={[styles.headerCell, styles.weekCell]}>
          Долоо хоног
        </ThemedText>
        <ThemedText
          style={[styles.headerCell, styles.typeCell, { textAlign: "center" }]}
        >
          Лекц
        </ThemedText>
        {haveLab && (
          <ThemedText
            style={[
              styles.headerCell,
              styles.typeCell,
              { textAlign: "center" },
            ]}
          >
            Лаборатор
          </ThemedText>
        )}
        {haveSem && (
          <ThemedText
            style={[
              styles.headerCell,
              styles.typeCell,
              { textAlign: "center" },
            ]}
          >
            Семинар
          </ThemedText>
        )}
      </Flex>

      <Flex style={styles.divider} />

      {weeks.map((i) => (
        <Flex key={i}>
          <Flex horizontal alignCenter style={styles.row}>
            <ThemedText style={[styles.weekCell, styles.weekLabel]}>
              {i + 1}-р долоо хоног
            </ThemedText>
            <Flex style={styles.typeCell}>
              <StatusBadge value={attendance.lecture?.[i]} />
            </Flex>
            {haveLab && (
              <Flex style={styles.typeCell}>
                <StatusBadge value={attendance.laboratory?.[i]} />
              </Flex>
            )}
            {haveSem && (
              <Flex style={styles.typeCell}>
                <StatusBadge value={attendance.seminar?.[i]} />
              </Flex>
            )}
          </Flex>
          {i < weekCount - 1 && <Flex style={styles.rowDivider} />}
        </Flex>
      ))}
    </Flex>
  );
}

function StatusBadge({ value }) {
  const present = value === 1;
  return (
    <Flex
      style={[styles.badge, present ? styles.badgePresent : styles.badgeAbsent]}
    >
      <ThemedText
        style={[
          styles.badgeText,
          present ? styles.badgeTextPresent : styles.badgeTextAbsent,
        ]}
      >
        {present ? "O" : "X"}
      </ThemedText>
    </Flex>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  headerCell: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F0F3FA",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8EDF5",
    marginBottom: 4,
  },
  weekCell: {
    flex: 2,
  },
  typeCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  weekLabel: {
    fontSize: 13,
    color: "#444",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "center",
  },
  badgePresent: {
    backgroundColor: "#E8F8E0",
  },
  badgeAbsent: {
    backgroundColor: "#FEF0ED",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  badgeTextPresent: {
    color: "#4CAF50",
  },
  badgeTextAbsent: {
    color: "#F54927",
  },
});
