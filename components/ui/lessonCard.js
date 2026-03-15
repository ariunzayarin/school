import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import { IconSymbol } from "./icon-symbol";

const SIZE = 200;
const RADIUS = 80;
const STROKE = 14;
const MAX_SCORE = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

function ArcSegment({ startPct, endPct, color }) {
  const length = (endPct - startPct) * CIRCUMFERENCE;
  const gap = CIRCUMFERENCE - length;
  const rotation = startPct * 360 - 90;

  return (
    <Circle
      cx={CENTER}
      cy={CENTER}
      r={RADIUS}
      fill="none"
      stroke={color}
      strokeWidth={STROKE}
      strokeDasharray={`${length} ${gap}`}
      strokeLinecap="round"
      transform={`rotate(${rotation}, ${CENTER}, ${CENTER})`}
    />
  );
}

export default function GradeCard({
  lessonId,
  lessonName,
  grades = [],
  maxScore = MAX_SCORE,
  onSelect,
}) {
  const total = grades.reduce((sum, g) => sum + g.score, 0);

  let cursor = 0;
  const segments = grades.map((g) => {
    const segPct = g.score / maxScore;
    const seg = { startPct: cursor, endPct: cursor + segPct, color: g.color };
    cursor += segPct;
    return seg;
  });

  return (
    <Flex style={styles.card}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {lessonName}
      </ThemedText>

      <Flex style={styles.chartContainer}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#EEF1F8"
            strokeWidth={STROKE}
          />
          {segments.map((seg, i) => (
            <ArcSegment key={i} {...seg} />
          ))}
        </Svg>

        <Flex style={styles.centerLabel} pointerEvents="none">
          <ThemedText style={styles.centerSub}>Нийт</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.centerScore}>
            {total}
          </ThemedText>
          <ThemedText style={styles.centerMax}>/ {maxScore} оноо</ThemedText>
        </Flex>
      </Flex>

      <Flex style={styles.legend}>
        {grades.map((g, i) => (
          <Flex key={i} horizontal alignCenter gap={8} full>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 4,
    lineHeight: 22,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 8,
  },
  centerLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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

  // Legend
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
