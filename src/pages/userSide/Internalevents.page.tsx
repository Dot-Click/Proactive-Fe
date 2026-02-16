import AboutEvent from "@/components/userSide/InternalEvents/AboutEvent/AboutEvent"
import ExperienceEvent from "@/components/userSide/InternalEvents/ExperienceEvent/ExperienceEvent"
// import InternalEventCard from "@/components/userSide/InternalEvents/InternalEventCard/InternalEventCard"
import SomeMemories from "@/components/userSide/InternalEvents/SomeMemories/SomeMemories"
import TeamSchedule from "@/components/userSide/InternalEvents/TeamSchedule/TeamSchedule"
import WildWeekendCard from "@/components/userSide/WildWeekend/WildWeekendCard/WildWeekendCard"

const InternaleventsPage = () => {
  return (
    <div>
      <WildWeekendCard />
      <SomeMemories />
      <ExperienceEvent />
      <AboutEvent />
      {/* <TeamSchedule /> */}
    </div>
  );
}

export default InternaleventsPage