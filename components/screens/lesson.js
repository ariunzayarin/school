import LessonCard from "../ui/lessonCard";

export function LessonScreen({ onSelect, lessons }) {
  return (
    <>
      {Object.entries(lessons).map(([id, lesson]) => (
        <LessonCard
          key={id}
          lessonId={id}
          lessonName={lesson.name}
          grades={lesson.grades}
          onSelect={() => onSelect(id)}
        />
      ))}
    </>
  );
}
