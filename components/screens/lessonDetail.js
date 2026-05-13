import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ThemedText from "../ui/textWithStyle";
import Flex from "../ui/flex";
import ParallaxScrollView from "../parallax-scroll-view";
import DropableContainer from "../ui/dropableContainer";
import AttendanceRecord from "../ui/attendanceRecord";
import AssignmentRecord from "../ui/assignmentRecord";
import StatBox from "../ui/statBox";

function getLessonProgress(lesson) {
  const totalMax = lesson.maxScores.reduce((s, m) => s + m.score, 0);

  const earned = lesson.grades.reduce((s, g) => s + g.score, 0);

  let canEarn = 30;

  lesson.assignments.forEach((a) => {
    if (a.score === null && a.maxScore) {
      canEarn += a.maxScore;
    }
  });

  const lost = totalMax - earned - canEarn;

  return { totalMax, earned, lost, canEarn };
}

export default function LessonDetail({ lesson, onBack }) {
  const [expanded, setExpanded] = useState(false);
  if (!lesson) return null;

  const assignmentTypes = [...new Set(lesson.assignments.map((a) => a.type))];

  let { earned, lost, canEarn } = getLessonProgress(lesson);

  const main = (
    <Flex>
      <ThemedText type="defaultSemiBold" style={styles.lessonName}>
        {lesson.name}
      </ThemedText>
      {!!lesson.description && (
        <ThemedText style={styles.description}>{lesson.description}</ThemedText>
      )}
    </Flex>
  );

  const child = (
    <>
      {!!lesson.teacher && (
        <Flex horizontal alignCenter gap={6} style={styles.metaRow}>
          <ThemedText style={styles.metaIcon}>👤</ThemedText>
          <ThemedText style={styles.metaText}>
            Багш: {lesson.teacher}
          </ThemedText>
        </Flex>
      )}
      {!!lesson.groups?.length && (
        <Flex horizontal alignCenter gap={6} style={styles.metaRow}>
          <ThemedText style={styles.metaIcon}>🏫</ThemedText>
          <ThemedText style={styles.metaText}>
            Орох ангиуд: {lesson.groups.join(", ")}
          </ThemedText>
        </Flex>
      )}
      {!!lesson.maxScores?.length && (
        <Flex horizontal alignCenter gap={6} style={styles.metaRow}>
          <ThemedText style={styles.metaIcon}>📋</ThemedText>
          <ThemedText style={styles.metaText}>
            Дүнгийн задаргаа:{"\n "}
            {lesson.maxScores.map((s) => `${s.label} ${s.score}`).join("\n ")}
          </ThemedText>
        </Flex>
      )}
    </>
  );

  return (
    <ParallaxScrollView backButtonOnClick={() => onBack()}>
      <Flex gap={5}>
        <DropableContainer
          isExpanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          main={main}
          child={child}
        />

        <Flex style={styles.statsRow}>
          {[
            { val: earned, label: "Цуглуулсан" },
            { val: lost, label: "Алдсан" },
            { val: canEarn, label: "Авах боломжтой" },
          ].map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.val} />
          ))}
        </Flex>

        <AttendanceRecord
          attendance={{
            lecture: lesson.attendance.lecture ?? [],
            laboratory: lesson.attendance.laboratory ?? [],
            seminar: lesson.attendance.seminar ?? [],
          }}
          collapsible
        />
        {assignmentTypes.map(
          (type) =>
            lesson.assignments?.filter((a) => a.type === type).length > 0 && (
              <AssignmentRecord
                key={type}
                assignments={lesson.assignments?.filter((a) => a.type === type)}
              />
            ),
        )}
      </Flex>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  lessonName: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },
  metaRow: {
    marginTop: 6,
  },
  metaIcon: {
    fontSize: 13,
  },
  metaText: {
    fontSize: 13,
    color: "#444",
    flexShrink: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
});
