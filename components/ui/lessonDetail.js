import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ThemedText from "../ui/textWithStyle";
import Flex from "../ui/flex";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import AttendanceChart from "./lineChart";
import DropableContainer from "./dropableContainer";
import Dropdown from "./dropdown";
import AttendanceTable from "./attandanceTable";

function AssignmentRow({ name, dateRange, score }) {
  return (
    <Flex horizontal spaceBetween alignCenter style={styles.assignmentRow}>
      <Flex style={{ flexShrink: 1, marginRight: 12 }}>
        <ThemedText type="defaultSemiBold" style={styles.assignmentName}>
          {name}
        </ThemedText>
        <ThemedText style={styles.assignmentDate}>{dateRange}</ThemedText>
      </Flex>
      <ThemedText type="defaultSemiBold" style={styles.assignmentScore}>
        {score} оноо
      </ThemedText>
    </Flex>
  );
}

export default function LessonDetail({ lesson, onBack }) {
  const [filter, setFilter] = useState("Лаборатори");

  if (!lesson) return null;

  const isAttendanceFilter = filter === "Ирц";
  const filteredAssignments = isAttendanceFilter
    ? []
    : (lesson.assignments ?? []).filter((a) => a.type === filter);

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
      <DropableContainer main={main} child={child} />

      {lesson.attendance && (
        <Flex gap={12}>
          <Flex gap={12} isWhiteContainer>
            <ThemedText>Ирцийн мэдээлэл</ThemedText>
            <AttendanceChart
              attendance={{
                lecture: lesson.attendance.lecture ?? [],
                laboratory: lesson.attendance.laboratory ?? [],
                seminar: lesson.attendance.seminar ?? [],
              }}
            />
          </Flex>
          {assignmentTypes.map(
            (type) =>
              lesson.assignments?.filter((a) => a.type === type).length > 0 && (
                <AttendanceChart
                  key={type}
                  mini
                  title={type}
                  assignments={
                    lesson.assignments?.filter((a) => a.type === type) ?? []
                  }
                />
              ),
          )}
        </Flex>
      )}

      <Flex isWhiteContainer>
        <Flex horizontal alignCenter gap={8} style={{ marginBottom: 12 }}>
          <Dropdown
            options={[...assignmentTypes, "Ирц"]}
            value={filter}
            onChange={setFilter}
          />
        </Flex>

        {isAttendanceFilter ? (
          lesson.attendance ? (
            <AttendanceTable
              attendance={{
                lecture: lesson.attendance.lecture ?? [],
                laboratory: lesson.attendance.laboratory ?? [],
                seminar: lesson.attendance.seminar ?? [],
              }}
            />
          ) : (
            <ThemedText style={styles.emptyText}>
              Ирцийн мэдээлэл байхгүй байна
            </ThemedText>
          )
        ) : filteredAssignments.length === 0 ? (
          <ThemedText style={styles.emptyText}>
            Өгөгдөл байхгүй байна
          </ThemedText>
        ) : (
          filteredAssignments.map((a, i) => (
            <React.Fragment key={i}>
              <AssignmentRow
                name={a.name}
                dateRange={a.dateRange}
                score={a.score}
              />
              {i < filteredAssignments.length - 1 && (
                <Flex style={styles.divider} />
              )}
            </React.Fragment>
          ))
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

  // Charts
  chartsRow: {
    // horizontal flex from Flex component
  },
  miniChartCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  miniChartTitle: {
    fontSize: 14,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  miniChart: {
    marginLeft: -12,
    borderRadius: 8,
  },

  // Assignments
  sectionTitle: {
    fontSize: 15,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  assignmentRow: {
    paddingVertical: 10,
  },
  assignmentName: {
    fontSize: 13,
    color: "#1a1a1a",
  },
  assignmentDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  assignmentScore: {
    fontSize: 13,
    color: "#669AF2",
    flexShrink: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F3FA",
  },
  emptyText: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    paddingVertical: 16,
  },

  // Dropdown
  dropdownWrapper: {
    position: "relative",
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dropdownLabel: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-end",
    paddingTop: 160,
    paddingHorizontal: 20,
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemActive: {
    backgroundColor: "#EEF3FD",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#333",
  },
  dropdownItemTextActive: {
    color: "#669AF2",
    fontWeight: "600",
  },
});
