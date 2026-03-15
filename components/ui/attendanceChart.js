import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import Divider from "./divider";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AttendanceChart({ attendance }) {
  const weeks = attendance.lecture.map((_, i) => `${i + 1}`);
  const haveLab = attendance.laboratory.length > 0;
  const haveSem = attendance.seminar.length > 0;

  const legend = (backgroundColor, label) => (
    <Flex horizontal alignCenter gap={6}>
      <Flex style={[styles.legendDot, { backgroundColor }]} />
      <ThemedText style={styles.legendLabel}>{label}</ThemedText>
    </Flex>
  );

  return (
    <Flex style={styles.chartWrapper}>
      <Flex horizontal gap={16} style={styles.legend}>
        {legend("#669AF2", "Лекц")}
        {haveLab && legend("#79DB3D", "Лаборатор")}
        {haveSem && legend("#db8530ff", "Семинар")}
      </Flex>

      <LineChart
        data={{
          labels: weeks,
          datasets: [
            {
              data: attendance.lecture,
              color: () => "#669AF2",
              strokeWidth: 2,
            },
            {
              data: attendance.laboratory,
              color: () => "#79DB3D",
              strokeWidth: 2,
            },
            {
              data: attendance.seminar,
              color: () => "#db8530ff",
              strokeWidth: 2,
            },
            { data: [0, 1], color: () => "transparent", strokeWidth: 0 },
          ],
        }}
        width={SCREEN_WIDTH - 80}
        height={180}
        segments={1}
        fromZero
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
          labelColor: () => "#888",
          propsForDots: { r: "3" },
          propsForBackgroundLines: { stroke: "#cecece", strokeDasharray: "" },
        }}
        bezier
        withShadow={false}
        style={styles.chart}
      />

      <Flex horizontal style={styles.summary}>
        <Flex horizontal alignCenter justifyCenter style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>Лекц</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "#669AF2" }}>
            {attendance.lecture.filter(Boolean).length}/
            {attendance.lecture.length}
          </ThemedText>
        </Flex>
        {haveLab && (
          <>
            <Divider vertical />
            <Flex
              horizontal
              alignCenter
              justifyCenter
              style={styles.summaryItem}
            >
              <ThemedText style={styles.summaryLabel}>Лаборатор</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: "#79DB3D" }}>
                {attendance.laboratory.filter(Boolean).length}/
                {attendance.laboratory.length}
              </ThemedText>
            </Flex>
          </>
        )}
        {haveSem && (
          <>
            <Divider vertical />
            <Flex
              horizontal
              alignCenter
              justifyCenter
              style={styles.summaryItem}
            >
              <ThemedText style={styles.summaryLabel}>Семинар</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: "#db8530ff" }}>
                {attendance.seminar.filter(Boolean).length}/
                {attendance.seminar.length}
              </ThemedText>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  chartWrapper: {
    paddingBottom: 4,
  },
  legend: {
    marginBottom: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: "#777",
  },
  chart: {
    borderRadius: 8,
    marginLeft: -16,
  },
  summary: {
    marginTop: 12,
    gap: 16,
  },
  summaryItem: {
    gap: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#999",
  },
});
