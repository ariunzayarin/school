import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import { semesters } from "../../constants/schedule";
import Flex from "../../components/ui/flex";
import DonutChart from "../../components/ui/donutChart";
import ThemedText from "../../components/ui/textWithStyle";
import { IconSymbol } from "../../components/ui/icon-symbol";
import ProgressBar from "../../components/ui/progressBar";
import Divider from "../../components/ui/divider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function getGpaColor(gpa) {
  if (gpa >= 3.7) return "#5BC4A8";
  if (gpa >= 3.3) return "#4C9BE8";
  if (gpa >= 3.0) return "#F5A623";
  return "#E87C7C";
}

function getScoreColor(score) {
  if (score >= 90) return "#5BC4A8";
  if (score >= 80) return "#4C9BE8";
  if (score >= 70) return "#F5A623";
  return "#E87C7C";
}

function GpaRing({ semester, size = 72 }) {
  const { gpa, courses } = semester;

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const segments = courses.map((c) => ({
    score: (c.credits / totalCredits) * (c.score / 100) * 100,
    color: c.color,
  }));

  return (
    <DonutChart
      segments={segments}
      maxScore={100}
      size={size}
      strokeWidth={7}
      trackColor="#E8EEF8"
      centerLabel={
        <Flex style={{ alignItems: "center" }}>
          <ThemedText
            style={{ fontSize: 14, fontWeight: "700", color: "#1a2040" }}
          >
            {gpa.toFixed(1)}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, color: "#8A93B0" }}>
            GPA
          </ThemedText>
        </Flex>
      }
    />
  );
}

function GradeBar({ score }) {
  const color = getScoreColor(score);

  return <ProgressBar percentage={score} color={color} />;
}

function CourseRow({ course, isLast }) {
  const gradeColor = getScoreColor(course.score);
  return (
    <Flex style={[styles.courseRow, isLast && { borderBottomWidth: 0 }]}>
      <Flex style={styles.courseRowTop}>
        <Flex style={styles.courseNameRow}>
          <Flex style={[styles.courseDot, { backgroundColor: gradeColor }]} />
          <ThemedText
            style={{ maxWidth: SCREEN_WIDTH - 140 }}
            numberOfLines={1}
          >
            {course.name}
          </ThemedText>
        </Flex>
        <Flex style={styles.courseRight}>
          <ThemedText type="caption">{course.credits}кр</ThemedText>
          <ThemedText style={[{ color: gradeColor }]}>
            {course.grade}
          </ThemedText>
        </Flex>
      </Flex>
      <GradeBar score={course.score} />
    </Flex>
  );
}

function SemesterCard({ semester, isExpanded, onToggle }) {
  const accentColor = getGpaColor(semester.gpa);
  semester.courses.map((course) => (course.color = accentColor));

  return (
    <Flex style={[styles.semCard, isExpanded && styles.semCardExpanded]}>
      <Flex style={[styles.semStripe, { backgroundColor: accentColor }]} />
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        style={styles.semHeader}
      >
        <GpaRing semester={semester} size={64} />

        <Flex style={styles.semInfo}>
          <ThemedText style={styles.semLabel}>{semester.label}</ThemedText>
          <ThemedText type="caption">{semester.totalCredits} кредит</ThemedText>
        </Flex>

        <IconSymbol
          name={isExpanded ? "chevron.up" : "chevron.down"}
          size={18}
          weight="medium"
          color={accentColor}
        />
      </TouchableOpacity>

      {isExpanded && (
        <Flex style={styles.courseList}>
          <Divider />
          {semester.courses.map((c, i) => (
            <CourseRow
              key={i}
              course={c}
              isLast={i === semester.courses.length - 1}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
}

function CumulativeCard({ semesters }) {
  const totalCredits = semesters.reduce((s, sem) => s + sem.totalCredits, 0);
  const weightedSum = semesters.reduce(
    (s, sem) => s + sem.gpa * sem.totalCredits,
    0,
  );
  const cumulativeGPA = (weightedSum / totalCredits).toFixed(2);
  const totalCourses = semesters.reduce((s, sem) => s + sem.courses.length, 0);

  const BAR_MAX_H = 28;
  const reversed = [...semesters].reverse();

  return (
    <Flex style={styles.heroCard}>
      <Flex style={styles.heroBlob1} />
      <Flex style={styles.heroBlob2} />

      <ThemedText style={styles.heroSubLabel}>Нийт GPA</ThemedText>

      <Flex style={styles.heroGpaRow}>
        <ThemedText style={styles.heroGpa}>{cumulativeGPA}</ThemedText>
        <ThemedText style={styles.heroGpaMax}>/ 4.0</ThemedText>
      </Flex>

      <Flex style={styles.heroStatsRow}>
        {[
          { label: "Нийт кредит", value: totalCredits },
          { label: "Улирал", value: semesters.length },
          { label: "Хичээл", value: totalCourses },
        ].map(({ label, value }) => (
          <Flex key={label} style={styles.heroStat}>
            <ThemedText style={styles.heroStatLabel}>{label}</ThemedText>
            <ThemedText style={styles.heroStatValue}>{value}</ThemedText>
          </Flex>
        ))}
      </Flex>

      <Flex style={styles.heroChart}>
        <Flex style={styles.heroBars}>
          {reversed.map((sem, i) => {
            const h = (sem.gpa / 4.0) * BAR_MAX_H;
            const color = getGpaColor(sem.gpa);
            return (
              <Flex key={i} style={[styles.heroBarWrap, { height: BAR_MAX_H }]}>
                <Flex style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Flex
                    style={[
                      styles.heroBar,
                      { height: h, backgroundColor: color },
                    ]}
                  />
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex style={styles.heroBarLabels}>
          {reversed.map((sem, i) => (
            <ThemedText key={i} style={styles.heroBarLabel} numberOfLines={1}>
              {sem.label.split(" — ")[0]}
            </ThemedText>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

function LegendChips() {
  const items = [
    { label: "A (90−100)", color: "#5BC4A8" },
    { label: "B (80−89)", color: "#4C9BE8" },
    { label: "C (70−79)", color: "#F5A623" },
    { label: "D (<70)", color: "#E87C7C" },
  ];
  return (
    <Flex style={styles.legendRow}>
      {items.map(({ label, color }) => (
        <Flex key={label} style={styles.legendChip}>
          <Flex style={[styles.legendDot, { backgroundColor: color }]} />
          <ThemedText type="caption">{label}</ThemedText>
        </Flex>
      ))}
    </Flex>
  );
}

export default function GradeScreen() {
  const [expanded, setExpanded] = useState(semesters[0].id);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <ParallaxScrollView title="Дүн">
      <CumulativeCard semesters={semesters} />

      <LegendChips />

      <ThemedText>УЛИРЛУУДААР</ThemedText>

      {semesters.map((sem) => (
        <SemesterCard
          key={sem.id}
          semester={sem}
          isExpanded={expanded === sem.id}
          onToggle={() => toggle(sem.id)}
        />
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 24,
    backgroundColor: "#2B3E5D",
    padding: 22,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  heroBlob1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  heroBlob2: {
    position: "absolute",
    bottom: -20,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(76,155,232,0.15)",
  },
  heroSubLabel: {
    fontSize: 12,
    color: "#8A93B0",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  heroGpaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 16,
  },
  heroGpa: {
    fontSize: 52,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 56,
  },
  heroGpaMax: {
    fontSize: 18,
    color: "#5BC4A8",
    marginBottom: 8,
    fontWeight: "600",
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  heroStat: {
    gap: 5,
  },
  heroStatLabel: {
    fontSize: 12,
    color: "#8A93B0",
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  heroChart: {
    marginTop: 4,
  },
  heroBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    height: 28,
  },
  heroBarWrap: {
    flex: 1,
  },
  heroBar: {
    borderRadius: 3,
    opacity: 0.85,
  },
  heroBarLabels: {
    flexDirection: "row",
    marginTop: 4,
  },
  heroBarLabel: {
    flex: 1,
    fontSize: 8,
    color: "#555e82",
    textAlign: "center",
  },

  // ── Legend
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  legendChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#2c408c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 10,
    color: "#555e82",
    fontWeight: "500",
  },

  // ── Section label
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#8A93B0",
    textTransform: "uppercase",
    marginBottom: 10,
    paddingLeft: 2,
  },

  // ── Semester card
  semCard: {
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#2c408c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  semCardExpanded: {
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  semStripe: {
    height: 3,
  },
  semHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  semInfo: {
    flex: 1,
    gap: 2,
  },
  semLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a2040",
  },
  semCredits: {
    fontSize: 11,
    color: "#8A93B0",
    marginTop: 2,
  },
  semBest: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F4F6FC",
    alignItems: "center",
    justifyContent: "center",
  },
  chevronBoxOpen: {
    transform: [{ rotate: "180deg" }],
  },

  // ── Course list
  courseList: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  courseDivider: {
    height: 1,
    backgroundColor: "#EEF2FA",
    marginBottom: 4,
  },
  courseRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2FA",
  },
  courseRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  courseNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  courseDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    flexShrink: 0,
  },
  courseName: {
    fontSize: 13,
    color: "#2D3561",
    fontWeight: "500",
    flex: 1,
  },
  courseRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  courseCredits: {
    fontSize: 10,
    color: "#8A93B0",
  },
  courseGrade: {
    fontSize: 12,
    fontWeight: "700",
    minWidth: 26,
    textAlign: "right",
  },

  // ── Grade bar
  gradeBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gradeBarTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E8EEF8",
    overflow: "hidden",
  },
  gradeBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  gradeBarScore: {
    fontSize: 11,
    fontWeight: "600",
    minWidth: 24,
    textAlign: "right",
  },
});
