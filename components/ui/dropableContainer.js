import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Flex from "./flex";
import { IconSymbol } from "./icon-symbol";
import Divider from "./divider";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DropableContainer({ main, child, onToggle, style }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  const mainWidth = SCREEN_WIDTH - 100;

  return (
    <TouchableOpacity onPress={toggle} style={style}>
      <Flex style={styles.tableContainer}>
        <Flex spaceBetween horizontal alignCenter>
          <Flex style={{ width: mainWidth }}>{main}</Flex>
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
            {child}
          </>
        )}
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
