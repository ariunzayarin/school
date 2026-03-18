import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DonutChart from "./donutChart";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import { IconSymbol } from "./icon-symbol";

const MAX_SCORE = 70;

export default function GradeCard({
  lessonId,
  lessonName,
  grades = [],
  maxScore = MAX_SCORE,
  onSelect,
}) {
  const total = grades.reduce((sum, g) => sum + g.score, 0);

  return (
    <Flex isWhiteContainer>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {lessonName}
      </ThemedText>

      <Flex style={styles.chartContainer}>
        <DonutChart
          segments={grades}
          size={150}
          maxScore={maxScore}
          centerLabel={
            <>
              <ThemedText style={styles.centerSub}>Нийт</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.centerScore}>
                {total}
              </ThemedText>
              <ThemedText style={styles.centerMax}>
                / {maxScore} оноо
              </ThemedText>
            </>
          }
        />
      </Flex>

      <Flex style={styles.legend}>
        {grades.map((g, i) => (
          <Flex key={i} horizontal alignCenter gap={8}>
            <Flex style={[styles.legendDot, { backgroundColor: g.color }]} />
            <ThemedText style={styles.legendLabel}>
              {g.label}
              {" — "}
              <ThemedText type="defaultSemiBold" style={styles.legendScore}>
                {g.score} оноо
              </ThemedText>
            </ThemedText>
          </Flex>
        ))}
      </Flex>

      <TouchableOpacity
        onPress={() => onSelect(lessonId)}
        activeOpacity={0.7}
        style={styles.detailRow}
      >
        <ThemedText style={styles.detailText}>Дэлгэрэнгүй</ThemedText>
        <IconSymbol name="chevron.right" size={16} color="#1a1a1a" />
      </TouchableOpacity>
    </Flex>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 4,
    lineHeight: 22,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  centerSub: {
    fontSize: 12,
    color: "#999",
  },
  centerScore: {
    fontSize: 28,
    color: "#1a1a1a",
    lineHeight: 34,
  },
  centerMax: {
    fontSize: 12,
    color: "#aaa",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    flexShrink: 0,
  },
  legendLabel: {
    fontSize: 13,
    color: "#555",
    flexShrink: 1,
  },
  legendScore: {
    color: "#1a1a1a",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#1a1a1a",
    textDecorationLine: "underline",
  },
});
