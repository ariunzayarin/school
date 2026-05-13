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
import Divider from "../../components/ui/divider";

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
    <ParallaxScrollView
      sticky={true}
      title={`Сайн уу? ${student[0].firstName}`}
      stickyContent={
        <Flex style={styles.heroCard}>
          <Flex style={styles.semPill}>
            <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
              Хавар 2025 · 10 дах долоо хоног
            </ThemedText>
          </Flex>
          <Divider
            margin={1}
            style={{ backgroundColor: "#fff", marginBottom: 10 }}
          />
          <Flex style={styles.heroStatsRow}>
            {[
              { val: String(thisSemester.courses.length), label: "Хичээл" },
              { val: `${thisSemester.gpa}%`, label: "GPA" },
              { val: String(ASSIGNMENTS.length), label: "Өгөх даалгаврууд" },
            ].map(({ label, val }) => (
              <Flex key={label} style={styles.heroStat}>
                <ThemedText style={styles.heroStatLabel}>{label}</ThemedText>
                <ThemedText style={styles.heroStatValue}>{val}</ThemedText>
              </Flex>
            ))}
          </Flex>
        </Flex>
      }
    >
      <Flex style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Өнөөдрийн хуваарь</ThemedText>
        <Button
          size="sm"
          variant="simple"
          onClick={() => setWeekVisible(true)}
          text={"Бүх хуваарь"}
          iconRight={"chevron.right"}
        />
      </Flex>
      <Flex style={styles.schedList}>
        <ScheduleBox
          // style={{ flexDirection: "row", gap: 15 }}
          boxItems={schedule}
          activeBoxKey={todayKey}
        />
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
  heroCard: {
    gap: 10,
    borderRadius: 24,
    backgroundColor: "#8AB0D8",
    padding: 22,
    overflow: "hidden",
    margin: 20,
    marginBottom: 0,
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-evenly",
  },
  heroStat: {
    gap: 5,
  },
  heroStatLabel: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  semPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    justifyContent: "center",
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
