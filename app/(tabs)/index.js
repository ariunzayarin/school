import { useState } from "react";

import ParallaxScrollView from "../../components/parallax-scroll-view";
import {
  ASSIGNMENTS,
  days,
  schedule,
  semesters,
  student,
} from "../../constants/schedule";
import Tab from "../../components/ui/tab";
import Flex from "../../components/ui/flex";
import ScheduleBox from "../../components/ui/scheduleBox";
import ThemedText from "../../components/ui/textWithStyle";
import { StyleSheet } from "react-native";
import Button from "../../components/ui/button";
import { AssignmentRow } from "../../components/ui/assignmentRecord";

export default function HomeScreen() {
  const availableDays = days.filter(
    (day) => schedule[day.key] && schedule[day.key].length > 0,
  );
  const semestersLength = semesters.length;
  const thisSemester = semesters[semestersLength - 1];
  const [activeDay, setActiveDay] = useState(availableDays[0]?.key ?? null);
  const [weekVisible, setWeekVisible] = useState(false);
  const todayIndex = new Date().getDay();
  const todayKey = days[todayIndex - 1].key;

  if (weekVisible) {
    return (
      <>
        <Tab
          tabItem={availableDays}
          onChange={setActiveDay}
          activeTabItem={activeDay}
        />
        <Flex full>
          <ScheduleBox boxItems={schedule} activeBoxKey={activeDay} />
        </Flex>
      </>
    );
  }

  return (
    <ParallaxScrollView title={`Сайн уу? ${student[0].firstName}`}>
      <Flex style={styles.semPill}>
        <ThemedText type="defaultSemiBold">
          Хавар 2025 · 10 дах долоо хоног
        </ThemedText>
      </Flex>
      <Flex style={styles.statsRow}>
        {[
          { val: String(thisSemester.courses.length), label: "Courses" },
          { val: `${thisSemester.gpa}%`, label: "Avg GPA" },
          { val: String(ASSIGNMENTS.length), label: "Pending Assignments" },
        ].map((stat) => (
          <Flex key={stat.label} style={styles.statCard}>
            <ThemedText style={styles.statVal}>{stat.val}</ThemedText>
            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
          </Flex>
        ))}
      </Flex>
      <Flex style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Өнөөдрийн хуваарь</ThemedText>
        <Button
          size="size_sm"
          variant="variant_simple"
          onPress={() => setWeekVisible(true)}
          text={"Бүх хуваарь"}
        />
      </Flex>
      <Flex style={styles.schedList}>
        <ScheduleBox boxItems={schedule} activeBoxKey={todayKey} />
      </Flex>
      {ASSIGNMENTS.length > 0 &&
        ASSIGNMENTS.map((a) => (
          <AssignmentRow
            key={a.id}
            dateRange={a.dateRange}
            name={a.title}
            lesson={a.subject}
          />
        ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  semPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#B5C8E8",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  statVal: {
    fontSize: 22,
    fontWeight: "300",
    color: "#2C2A26",
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 10,
    color: "#888780",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: { fontWeight: "700", color: "#2C2A26" },
});
