import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Flex from "./flex";

const DEFAULT_SIZE = 200;
const DEFAULT_STROKE = 14;
const DEFAULT_MAX = 100;

export default function DonutChart({
  segments = [],
  maxScore = DEFAULT_MAX,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  trackColor = "#EEF1F8",
  centerLabel,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cursor = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.score / maxScore;
    const arc = {
      startPct: cursor,
      endPct: cursor + pct,
      color: seg.color,
    };
    cursor += pct;
    return arc;
  });

  return (
    <Flex style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {arcs.map((arc, i) => {
          const length = (arc.endPct - arc.startPct) * circumference;
          const gap = circumference - length;
          const rotation = arc.startPct * 360 - 90;
          return (
            <Circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${length} ${gap}`}
              strokeLinecap="round"
              transform={`rotate(${rotation}, ${center}, ${center})`}
            />
          );
        })}
      </Svg>

      {centerLabel && (
        <Flex style={styles.centerLabel} pointerEvents="none">
          {centerLabel}
        </Flex>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
