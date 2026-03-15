import { useRole } from "../../hooks/useRole";
import { LessonScreen as LessonScreenCard } from "../../components/ui/lesson";
import { useState } from "react";
import ParallaxScrollView from "../../components/parallax-scroll-view";
import LessonDetail from "../../components/ui/lessonDetail";
import { lessons } from "../../constants/schedule";

export default function LessonScreen() {
  const { isTeacher, isStudent, loading } = useRole();
  const [lessonId, setLessonId] = useState(null);

  if (loading) return null;

  const openLesson = (id) => setLessonId(id);

  const closeLesson = () => setLessonId(null);

  if (lessonId !== null) {
    return (
      <ParallaxScrollView title="Хичээл">
        <LessonDetail isTeacher lessonId={lessonId} onBack={closeLesson} />
      </ParallaxScrollView>
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
