import { useState } from "react";

import ParallaxScrollView from "../../components/parallax-scroll-view";
import { days, schedule } from "../../constants/schedule";
import Tab from "../../components/ui/tab";
import Flex from "../../components/ui/flex";
import ScheduleBox from "../../components/ui/scheduleBox";

export default function HomeScreen() {
  const availableDays = days.filter(
    (day) => schedule[day.key] && schedule[day.key].length > 0,
  );
  const [activeDay, setActiveDay] = useState(availableDays[0]?.key ?? null);

  return (
    <ParallaxScrollView title="Хичээлийн хуваарь">
      <Tab
        tabItem={availableDays}
        onChange={setActiveDay}
        activeTabItem={activeDay}
      />
      <Flex full>
        <ScheduleBox boxItems={schedule} activeBoxKey={activeDay} />
      </Flex>
    </ParallaxScrollView>
  );
}
