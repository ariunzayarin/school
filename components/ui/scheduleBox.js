import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "./textWithStyle";
import Flex from "./flex";
import { IconSymbol } from "./icon-symbol";
import Divider from "./divider";
import AttendanceChart from "./attendanceChart";

export default function ScheduleBox({ boxItems, activeBoxKey }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <>
      {boxItems[activeBoxKey]?.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggle(index)}
            style={styles.card}
          >
            <Flex key={index} style={styles.tableContainer}>
              <Flex spaceBetween horizontal alignCenter>
                <Flex style={{ flexShrink: 1 }}>
                  <ThemedText>{item.time}</ThemedText>
                  <ThemedText type="defaultSemiBold">{item.subject}</ThemedText>
                  <ThemedText>{item.type}</ThemedText>
                  <ThemedText>{item.room}</ThemedText>
                  <ThemedText>{item.teacher}</ThemedText>
                </Flex>
                <IconSymbol
                  name={isOpen ? "chevron.up" : "chevron.down"}
                  size={18}
                  weight="medium"
                  color={"#333"}
                />
              </Flex>
              {isOpen && (
                <>
                  <Divider />
                  <AttendanceChart attendance={item.attendance} />
                </>
              )}
            </Flex>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
