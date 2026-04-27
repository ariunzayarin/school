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
import StatBox from "../../components/ui/statBox";

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
      <ParallaxScrollView backButtonOnClick={() => setWeekVisible(false)}>
        <Tab
          tabItem={availableDays}
          onChange={setActiveDay}
          activeTabItem={activeDay}
        />
        <Flex full>
          <ScheduleBox boxItems={schedule} activeBoxKey={activeDay} />
        </Flex>
      </ParallaxScrollView>
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
          <StatBox key={stat.label} label={stat.label} value={stat.val} />
        ))}
      </Flex>
      <Flex style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Өнөөдрийн хуваарь</ThemedText>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setWeekVisible(true)}
          text={"Бүх хуваарь"}
        />
      </Flex>
      <Flex style={styles.schedList}>
        <ScheduleBox boxItems={schedule} activeBoxKey={todayKey} />
      </Flex>
      <ThemedText style={styles.sectionTitle}>Хийх даалгавар</ThemedText>
      <Flex isWhiteContainer>
        {ASSIGNMENTS.length > 0 &&
          ASSIGNMENTS.map((a, index) => (
            <AssignmentRow
              key={a.id}
              dateRange={a.dateRange}
              name={a.title}
              lesson={a.subject}
              isLast={index === ASSIGNMENTS.length - 1}
            />
          ))}
      </Flex>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#2C2A26",
  },
});
