import { useRole } from "../../hooks/useRole";
import { LessonScreen as LessonScreenCard } from "../../components/screens/lesson";
import { useState } from "react";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import LessonDetail from "../../components/screens/lessonDetail";
import { lessons } from "../../constants/schedule";

export default function LessonScreen() {
  const { isTeacher, isStudent, loading } = useRole();
  const [lessonId, setLessonId] = useState(null);

  if (loading) return null;

  const openLesson = (id) => setLessonId(id);

  const closeLesson = () => setLessonId(null);

  if (lessonId !== null) {
    return (
      <LessonDetail isTeacher lesson={lessons[lessonId]} onBack={closeLesson} />
    );
  }

  return (
    <ParallaxScrollView title="Хичээл">
      {isTeacher && (
        <LessonScreenCard lessons={lessons} onSelect={openLesson} />
      )}
      {isStudent && (
        <LessonScreenCard lessons={lessons} onSelect={openLesson} />
      )}
    </ParallaxScrollView>
  );
}
