import React from "react";
import { StyleSheet } from "react-native";
import ThemedText from "../ui/textWithStyle";
import Flex from "../ui/flex";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import DropableContainer from "./dropableContainer";
import AttendanceRecord from "./attendanceRecord";
import AssignmentRecord from "./assignmentRecord";
import LessonCard from "./lessonCard";

export default function LessonDetail({ lesson, onBack }) {
  if (!lesson) return null;

  const assignmentTypes = [...new Set(lesson.assignments.map((a) => a.type))];

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
        <DropableContainer main={main} child={child} />

        <LessonCard
          lessonId={lesson.id}
          lessonName={lesson.name}
          grades={lesson.grades}
        />

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
});
