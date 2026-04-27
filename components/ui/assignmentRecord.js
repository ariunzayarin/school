import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import DropableContainer from "./dropableContainer";
import ProgressBar from "./progressBar";
import Divider from "./divider";

export function AssignmentRow({ name, dateRange, score, lesson, isLast }) {
  const scoreText = score === null ? "" : `${score} оноо`;

  return (
    <>
      <Flex horizontal spaceBetween alignCenter>
        <Flex style={{ flexShrink: 1, marginRight: 12 }}>
          {lesson && <ThemedText type="subtitle">{lesson}</ThemedText>}
          <ThemedText type="defaultSemiBold" style={styles.assignmentName}>
            {name}
          </ThemedText>
          <ThemedText style={styles.assignmentDate}>{dateRange}</ThemedText>
        </Flex>
        {score && (
          <ThemedText type="defaultSemiBold" style={styles.assignmentScore}>
            {scoreText}
          </ThemedText>
        )}
      </Flex>
      {!isLast && <Divider margin={1} />}
    </>
  );
}

export default function AssignmentRecord({ assignments }) {
  const [expanded, setExpanded] = useState(false);

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

  const assignmentsCount = assignments.length;

  const detailedView = (
    <Flex gap={16} style={styles.container}>
      {assignments.map((a, index) => (
        <AssignmentRow
          key={a.name}
          name={a.name}
          dateRange={a.dateRange}
          score={a.score}
          isLast={index === assignmentsCount - 1}
        />
      ))}
    </Flex>
  );

  return (
    <DropableContainer
      isExpanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      main={summaryView}
      child={detailedView}
    />
  );
}

const styles = StyleSheet.create({});
