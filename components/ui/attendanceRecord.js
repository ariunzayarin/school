import React from "react";
import { StyleSheet } from "react-native";
import Flex from "./flex";
import DropableContainer from "./dropableContainer";
import AttendanceTable from "./attandanceTable";
import ProgressBar from "./progressBar";

export default function AttendanceRecord({ attendance, collapsible }) {
  const haveLab = attendance.laboratory?.length > 0;
  const haveSem = attendance.seminar?.length > 0;

  const summaryView = (
    <Flex style={styles.container} gap={16}>
      <ProgressBar collapsible label="Лекцийн ирц" data={attendance.lecture} />

      {haveLab && (
        <ProgressBar
          collapsible
          label="Лабораторийн ирц"
          data={attendance.laboratory}
        />
      )}

      {haveSem && (
        <ProgressBar
          collapsible
          label="Семинарын ирц"
          data={attendance.seminar}
        />
      )}
    </Flex>
  );

  const detailedView = (
    <Flex gap={16} style={styles.container}>
      <AttendanceTable attendance={attendance} />
    </Flex>
  );

  if (collapsible) {
    return <DropableContainer main={summaryView} child={detailedView} />;
  }

  return summaryView;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },

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
