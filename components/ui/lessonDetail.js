import Button from "../ui/button";
import Flex from "../ui/flex";
import ThemedText from "../ui/textWithStyle";

import { lessons } from "../../constants/schedule";

export default function LessonDetail({ lessonId, onBack, isTeacher }) {
  const lesson = lessons[lessonId];

  if (!lesson) return null;

  return (
    <Flex>
      <Button text="← Буцах" variant="ghost" onClick={onBack} />
      <ThemedText type="title">{lesson.name}</ThemedText>
      {/* render lesson.grades etc */}
    </Flex>
  );
}
