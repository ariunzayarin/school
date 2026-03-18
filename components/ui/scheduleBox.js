import React from "react";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import AttendanceChart from "./lineChart";
import DropableContainer from "./dropableContainer";

export default function ScheduleBox({ boxItems, activeBoxKey }) {
  return (
    <>
      {boxItems[activeBoxKey]?.map((item, index) => {
        const hasAttendance = !!item.attendance;

        const main = (
          <Flex style={{ flexShrink: 1 }}>
            <ThemedText>{item.time}</ThemedText>
            <ThemedText type="defaultSemiBold">{item.subject}</ThemedText>
            <ThemedText>{item.type}</ThemedText>
            <ThemedText>{item.room}</ThemedText>
            <ThemedText>{item.teacher}</ThemedText>
          </Flex>
        );

        const child = hasAttendance ? (
          <Flex gap={10}>
            <ThemedText>Ирцийн мэдээлэл</ThemedText>
            <AttendanceChart
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

        return <DropableContainer key={index} main={main} child={child} />;
      })}
    </>
  );
}
