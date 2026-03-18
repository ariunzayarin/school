import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import Divider from "./divider";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AttendanceChart({
  attendance,
  mini = false,
  title,
  assignments = [],
  width,
}) {
  if (mini) {
    const scores = assignments.map((a) => a.score ?? 0);
    const labels = assignments.map((_, i) => `${i + 1}`);

    return (
      <Flex style={styles.miniCard}>
        {!!title && (
          <ThemedText type="defaultSemiBold" style={styles.miniTitle}>
            {title}
          </ThemedText>
        )}

        {assignments.length === 0 ? (
          <ThemedText style={styles.emptyText}>Өгөгдөл байхгүй</ThemedText>
        ) : (
          <>
            <LineChart
              data={{
                labels,
                datasets: [
                  {
                    data: scores,
                    color: () => "#669AF2",
                    strokeWidth: 2,
                  },
                ],
              }}
              width={width ?? SCREEN_WIDTH - 80}
              height={190}
              fromZero
              segments={4}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 1,
                color: () => "#555",
                labelColor: () => "#555",
                propsForDots: { r: "4", fill: "#669AF2" },
                propsForBackgroundLines: {
                  stroke: "#cacacbff",
                  strokeDasharray: "",
                },
                propsForLabels: {
                  fontSize: 9,
                },
              }}
              withShadow={false}
              style={styles.miniChart}
            />

            <Flex horizontal spaceBetween style={styles.miniSummary}>
              <ThemedText style={styles.miniSummaryLabel}>Нийт</ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={styles.miniSummaryValue}
              >
                {assignments
                  .filter((a) => a.score !== null)
                  .reduce((s, a) => s + a.score, 0)
                  .toFixed(1)}{" "}
                оноо
              </ThemedText>
            </Flex>
          </>
        )}
      </Flex>
    );
  }

  const haveLab = attendance.laboratory?.length > 0;
  const haveSem = attendance.seminar?.length > 0;

  const chartWidth = width ?? SCREEN_WIDTH - 80;
  const labels = attendance.lecture.map((_, i) => `${i + 1}`);

  const datasets = [
    { data: attendance.lecture, color: () => "#669AF2", strokeWidth: 2 },
    ...(haveLab
      ? [
          {
            data: attendance.laboratory,
            color: () => "#79DB3D",
            strokeWidth: 2,
          },
        ]
      : []),
    ...(haveSem
      ? [{ data: attendance.seminar, color: () => "#db8530", strokeWidth: 2 }]
      : []),
    { data: [0, 1], color: () => "transparent", strokeWidth: 0 },
  ];

  return (
    <Flex style={styles.chartWrapper}>
      <Flex horizontal gap={16} style={styles.legend}>
        <LegendItem color="#669AF2" label="Лекц" />
        {haveLab && <LegendItem color="#79DB3D" label="Лаборатор" />}
        {haveSem && <LegendItem color="#db8530" label="Семинар" />}
      </Flex>

      <LineChart
        data={{ labels, datasets }}
        width={chartWidth}
        height={80}
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
        withShadow={false}
        style={styles.chart}
      />

      <Flex horizontal style={styles.summary}>
        <SummaryItem label="Лекц" color="#669AF2" data={attendance.lecture} />
        {haveLab && (
          <>
            <Divider vertical />
            <SummaryItem
              label="Лаборатор"
              color="#79DB3D"
              data={attendance.laboratory}
            />
          </>
        )}
        {haveSem && (
          <>
            <Divider vertical />
            <SummaryItem
              label="Семинар"
              color="#db8530"
              data={attendance.seminar}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
}

function LegendItem({ color, label }) {
  return (
    <Flex horizontal alignCenter gap={6}>
      <Flex style={[styles.legendDot, { backgroundColor: color }]} />
      <ThemedText>{label}</ThemedText>
    </Flex>
  );
}

function SummaryItem({ label, color, data }) {
  return (
    <Flex horizontal alignCenter justifyCenter style={styles.summaryItem}>
      <ThemedText>{label}</ThemedText>
      <ThemedText type="defaultSemiBold" style={{ color }}>
        {data.filter(Boolean).length}/{data.length}
      </ThemedText>
    </Flex>
  );
}

const styles = StyleSheet.create({
  chartWrapper: { paddingBottom: 4 },
  legend: { marginBottom: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  chart: { borderRadius: 8, marginLeft: -16 },
  summary: { marginTop: 12, gap: 16 },
  summaryItem: { gap: 8 },
  miniCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  miniTitle: {
    fontSize: 14,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  miniChart: {
    marginLeft: -12,
    borderRadius: 8,
  },
  miniSummary: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#d6d7d9ff",
  },
  miniSummaryLabel: {
    fontSize: 12,
    color: "#555",
  },
  miniSummaryValue: {
    fontSize: 13,
    color: "#669AF2",
  },
  emptyText: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    paddingVertical: 16,
  },
});
