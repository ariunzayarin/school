import React, { useState } from "react";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import DropableContainer from "./dropableContainer";
import AttendanceRecord from "./attendanceRecord";

export default function ScheduleBox({ boxItems, activeBoxKey }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <>
      {boxItems[activeBoxKey]?.map((item, index) => {
        const hasAttendance = !!item.attendance;

        const main = (
          <Flex gap={4} style={{ flexShrink: 1 }}>
            <ThemedText>{item.time}</ThemedText>
            <ThemedText type="defaultSemiBold">
              {item.subject} ({item.type})
            </ThemedText>
            <ThemedText>
              {item.room} · {item.teacher}
            </ThemedText>
          </Flex>
        );

        const child = hasAttendance ? (
          <Flex gap={10}>
            <AttendanceRecord
              attendance={{
                lecture: item.attendance.lecture ?? [],
                laboratory: item.attendance.laboratory ?? [],
                seminar: item.attendance.seminar ?? [],
              }}
            />
          </Flex>
        ) : (
          <ThemedText>Ирц бүртгэгдээгүй байна</ThemedText>
        );

        return (
          <DropableContainer
            isExpanded={expanded === item}
            onToggle={() => toggle(item)}
            key={index}
            main={main}
            child={child}
          />
        );
      })}
    </>
  );
}
