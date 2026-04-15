import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import ThemedText from "./textWithStyle";
import Flex from "./flex";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ProgressBar({
  data,
  collapsible,
  label,
  type = "attendance",
  color,
  percentage,
}) {
  const progressBarLength = collapsible
    ? SCREEN_WIDTH - 120
    : SCREEN_WIDTH - 80;

  const getAttendanceStats = (data = []) => {
    const total = data.length;
    const present = data.filter((d) => d === 1).length;
    const percent = total === 0 ? 0 : Math.round((present / total) * 100);
    return {
      percent,
      meta: `${present}/${total}`,
    };
  };

  const getScoreStats = (data = []) => {
    const valid = data.filter((d) => d.score !== null);
    const validMax = data.filter((d) => d.maxScore !== null);

    const sum = valid.reduce((acc, d) => acc + d.score, 0);
    const sumMax = validMax.reduce((acc, d) => acc + d.maxScore, 0);

    const percent = Math.round((sum / sumMax) * 100);

    return {
      percent,
      meta: `${sum} / ${sumMax}`,
    };
  };

  const { percent, meta } = percentage
    ? { percent: percentage, meta: percentage }
    : type === "attendance"
      ? getAttendanceStats(data)
      : getScoreStats(data);

  const Bar = () => {
    const length = label ? progressBarLength : progressBarLength - 25;
    return (
      <Flex style={[styles.progressContainer, { width: length }]}>
        <Flex
          style={[
            styles.progressFill,
            { width: `${percent}%` },
            color && { backgroundColor: color },
          ]}
        />
      </Flex>
    );
  };

  const ifLabeled = () => {
    return (
      <Flex gap={6}>
        <Flex horizontal spaceBetween style={{ width: progressBarLength }}>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <ThemedText style={styles.percent}>{percent}%</ThemedText>
        </Flex>

        <Bar />

        <ThemedText style={styles.meta}>{meta}</ThemedText>
      </Flex>
    );
  };

  return (
    <Flex>
      {label ? (
        ifLabeled()
      ) : (
        <Flex alignCenter horizontal spaceBetween gap={6}>
          <Bar />
          <ThemedText style={styles.percent}>{percent}%</ThemedText>
        </Flex>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    opacity: 0.8,
  },

  percent: {
    fontSize: 14,
    fontWeight: "600",
  },

  meta: {
    fontSize: 12,
    opacity: 0.6,
  },

  progressContainer: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 6,
  },
});
