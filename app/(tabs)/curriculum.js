import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import Tab from "../../components/ui/tab";
import Flex from "../../components/ui/flex";
import {
  ALL_COURSES,
  CATEGORY_CONFIG,
  SUGGESTED_PLAN,
} from "../../constants/schedule";
import ThemedText from "../../components/ui/textWithStyle";
import DropableContainer from "../../components/ui/dropableContainer";

const Badge = ({ type }) => (
  <Flex
    style={[
      styles.badge,
      type === "required" ? styles.badgeRequired : styles.badgeElective,
    ]}
  >
    <ThemedText
      style={[
        styles.badgeText,
        type === "required"
          ? styles.badgeTextRequired
          : styles.badgeTextElective,
      ]}
    >
      {type === "required" ? "Заавал судлах" : "Сонгон судлах"}
    </ThemedText>
  </Flex>
);

const CategoryTag = ({ category }) => {
  const cfg = CATEGORY_CONFIG[category];
  if (!cfg) return null;
  return (
    <Flex style={[styles.categoryTag, { backgroundColor: cfg.bgColor }]}>
      <ThemedText style={[styles.categoryTagText, { color: cfg.textColor }]}>
        {cfg.label}
      </ThemedText>
    </Flex>
  );
};

const PrereqChip = ({ code }) => (
  <Flex style={styles.prereqChip}>
    <ThemedText style={styles.prereqChipText}>{code}</ThemedText>
  </Flex>
);

const CourseCard = ({ course, showCategory = false }) => {
  const isRequired = course.type === "required";
  return (
    <Flex
      style={[
        styles.courseCard,
        isRequired ? styles.courseCardRequired : styles.courseCardElective,
      ]}
    >
      <Flex style={styles.courseTop}>
        <Flex style={styles.courseTopLeft}>
          <ThemedText style={styles.courseCode}>{course.code}</ThemedText>
          <ThemedText style={styles.courseName}>{course.name}</ThemedText>
        </Flex>
        <Flex style={styles.badgeCol}>
          <Badge type={course.type} />
          {showCategory && <CategoryTag category={course.category} />}
        </Flex>
      </Flex>
      <Flex style={styles.courseMeta}>
        <ThemedText style={styles.metaText}>{course.credits} кредит</ThemedText>
        {course.prerequisites.length > 0 && (
          <>
            <Flex style={styles.metaDot} />
            <ThemedText style={styles.metaText}>Шаардагдах: </ThemedText>
            {course.prerequisites.map((p) => (
              <PrereqChip key={p} code={p} />
            ))}
          </>
        )}
      </Flex>
    </Flex>
  );
};

const SemesterHeader = ({ semester, totalCredits }) => (
  <Flex style={styles.semesterHeader}>
    <Flex style={styles.semesterPill}>
      <ThemedText style={styles.semesterPillText}>{semester}</ThemedText>
    </Flex>
    <Flex style={styles.semesterLine} />
    {totalCredits && (
      <ThemedText style={styles.semesterCredits}>
        {totalCredits} кредит
      </ThemedText>
    )}
  </Flex>
);

const CategorySection = ({ categoryKey, groups }) => {
  const [expanded, setExpanded] = useState(true);
  const cfg = CATEGORY_CONFIG[categoryKey];

  return (
    <DropableContainer
      isExpanded={expanded}
      main={<ThemedText>{cfg.label}</ThemedText>}
      child={
        <Flex style={styles.categoryBody}>
          {groups.map((group) =>
            group.courses.map((c) => (
              <CourseCard
                key={c.code}
                course={{ ...c, type: group.type, category: categoryKey }}
              />
            )),
          )}
        </Flex>
      }
      onToggle={() => setExpanded(!expanded)}
    />
  );
};

const AllCoursesTab = () => {
  const grouped = {};
  for (const entry of ALL_COURSES) {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push({ type: entry.type, courses: entry.courses });
  }

  const totalRequired = ALL_COURSES.filter((g) => g.type === "required").reduce(
    (sum, g) => sum + g.courses.length,
    0,
  );
  const totalElective = ALL_COURSES.filter((g) => g.type === "elective").reduce(
    (sum, g) => sum + g.courses.length,
    0,
  );
  const totalCredits = ALL_COURSES.flatMap((g) => g.courses).reduce(
    (sum, c) => sum + c.credits,
    0,
  );
  const completedCredits = 91;
  const progressPct = Math.round((completedCredits / totalCredits) * 100);

  return (
    <Flex>
      <Flex style={styles.statRow}>
        {[
          { label: "Required", value: totalRequired, sub: "courses" },
          { label: "Elective", value: totalElective, sub: "courses" },
          { label: "Total", value: totalCredits, sub: "credits" },
        ].map((s) => (
          <Flex key={s.label} style={styles.statCard}>
            <ThemedText style={styles.statLabel}>{s.label}</ThemedText>
            <ThemedText style={styles.statValue}>{s.value}</ThemedText>
            <ThemedText style={styles.statSub}>{s.sub}</ThemedText>
          </Flex>
        ))}
      </Flex>

      <Flex style={styles.progressCard}>
        <Flex style={styles.progressTop}>
          <ThemedText style={styles.progressLabel}>Явц</ThemedText>
          <ThemedText style={styles.progressPercent}>{progressPct}%</ThemedText>
        </Flex>
        <Flex style={styles.barBg}>
          <Flex style={[styles.barFill, { width: `${progressPct}%` }]} />
        </Flex>
        <ThemedText style={styles.progressSub}>
          {completedCredits} / {totalCredits} кредит цугласан
        </ThemedText>
      </Flex>

      {Object.entries(grouped).map(([catKey, groups]) => (
        <CategorySection key={catKey} categoryKey={catKey} groups={groups} />
      ))}
    </Flex>
  );
};

const SuggestedPlanTab = () => (
  <>
    {SUGGESTED_PLAN.map((sem) => (
      <Flex key={sem.semester}>
        <SemesterHeader
          semester={`${sem.semester}  улирал`}
          totalCredits={sem.totalCredits}
        />
        {sem.courses.map((c) => (
          <CourseCard key={`${sem.semester}-${c.code}`} course={c} />
        ))}
      </Flex>
    ))}
  </>
);

export default function CurriculumScreen() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <ParallaxScrollView title="Хөтөлбөр">
      <Tab
        tabItem={[
          { key: "all", label: "Бүх хөтөлбөр" },
          { key: "suggested", label: "Санал болгох" },
        ]}
        onChange={setActiveTab}
        activeTabItem={activeTab}
      />
      {activeTab === "all" ? <AllCoursesTab /> : <SuggestedPlanTab />}
    </ParallaxScrollView>
  );
}

const BLUE = "#185FA5";
const GREEN = "#1D9E75";
const BLUE_BG = "#E6F1FB";
const BLUE_TEXT = "#0C447C";
const GREEN_BG = "#E1F5EE";
const GREEN_TEXT = "#0F6E56";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F5F3",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#C0C0BC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  backBtnText: {
    fontSize: 16,
    color: "#666",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1A1A18",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  degreePill: {
    alignSelf: "flex-start",
    backgroundColor: BLUE_BG,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  degreePillText: {
    fontSize: 12,
    color: BLUE_TEXT,
    fontWeight: "500",
  },

  // ── Tab bar
  tabBar: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: BLUE,
  },
  tabText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "400",
  },
  tabTextActive: {
    color: BLUE,
    fontWeight: "500",
  },

  // ── Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },

  // ── Stat cards
  statRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#E0E0DC",
    borderRadius: 8,
    padding: 12,
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A1A18",
  },
  statSub: {
    fontSize: 11,
    color: "#AAA",
  },
  progressCard: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#E0E0DC",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    marginTop: 12,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#888",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1A1A18",
  },
  barBg: {
    height: 6,
    backgroundColor: "#EFEFEB",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    backgroundColor: BLUE,
    borderRadius: 99,
  },
  progressSub: {
    fontSize: 11,
    color: "#AAA",
    marginTop: 6,
  },

  // ── Course card
  courseCard: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#bcbcbc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
  },
  courseCardRequired: {
    borderLeftColor: BLUE,
  },
  courseCardElective: {
    borderLeftColor: GREEN,
  },
  courseTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  courseTopLeft: {
    flex: 1,
  },
  courseCode: {
    fontSize: 11,
    color: "#AAA",
    fontFamily: "monospace",
    marginBottom: 3,
  },
  courseName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A18",
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C0C0BC",
  },
  prereqRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  prereqLabel: {
    fontSize: 11,
    color: "#AAA",
  },
  prereqChip: {
    backgroundColor: "#F1EFE8",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  prereqChipText: {
    fontSize: 11,
    color: "#888",
  },

  // ── Badge
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexShrink: 0,
  },
  badgeRequired: {
    backgroundColor: BLUE_BG,
  },
  badgeElective: {
    backgroundColor: GREEN_BG,
  },
  badgeText: {
    fontSize: 11,
  },
  badgeTextRequired: {
    color: BLUE_TEXT,
  },
  badgeTextElective: {
    color: GREEN_TEXT,
  },

  // ── Semester header
  semesterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    marginTop: 20,
  },
  semesterPill: {
    backgroundColor: BLUE,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  semesterPillText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  semesterLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#E0E0DC",
  },
  semesterCredits: {
    fontSize: 12,
    color: "#777",
  },

  // ── Suggested intro
  suggestedIntro: {
    fontSize: 13,
    color: "#888",
    lineHeight: 20,
    marginBottom: 14,
  },
});
