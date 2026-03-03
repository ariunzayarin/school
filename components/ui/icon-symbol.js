import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MAPPING = {
  "house.fill": "home",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "chevron.left.forwardslash.chevron.right": "code",
  bell: "notifications-none",
  "bell.fill": "notifications",
  "paperplane.fill": "send",
  xmark: "close",
  "rectangle.portrait.and.arrow.right": "logout",
  calendar: "calendar-today",
  "books.vertical": "menu-book",
  "folder-open": "folder-open",
  "chart.bar": "bar-chart",
};

export function IconSymbol({ name, size = 24, color, style }) {
  const iconName = MAPPING[name];
  if (!iconName) {
    console.warn(`IconSymbol: no mapping found for "${name}"`);
  }
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName ?? "help-outline"}
      style={style}
    />
  );
}
