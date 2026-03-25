import React from "react";
import { StyleSheet } from "react-native";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import DropableContainer from "./dropableContainer";
import ProgressBar from "./progressBar";

function AssignmentRow({ name, dateRange, score }) {
  const scoreText = score === null ? "" : `${score} оноо`;
  return (
    <Flex horizontal spaceBetween alignCenter style={styles.assignmentRow}>
      <Flex style={{ flexShrink: 1, marginRight: 12 }}>
        <ThemedText type="defaultSemiBold" style={styles.assignmentName}>
          {name}
        </ThemedText>
        <ThemedText style={styles.assignmentDate}>{dateRange}</ThemedText>
      </Flex>
      <ThemedText type="defaultSemiBold" style={styles.assignmentScore}>
        {scoreText}
      </ThemedText>
    </Flex>
  );
}

export default function AssignmentRecord({ assignments }) {
  const summaryView = (
    <Flex style={styles.container} gap={16}>
      <ProgressBar
        label={assignments[0].type}
        type="score"
        collapsible
        data={assignments}
      />
    </Flex>
  );

  const detailedView = (
    <Flex gap={16} style={styles.container}>
      {assignments.map((a) => (
        <AssignmentRow
          key={a.name}
          name={a.name}
          dateRange={a.dateRange}
          score={a.score}
        />
      ))}
    </Flex>
  );

  return <DropableContainer main={summaryView} child={detailedView} />;
}

const styles = StyleSheet.create({});
