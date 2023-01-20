import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

const AllEvent = () => {
  const AllItem = getAllEvents();
  return (
    <main>
      <EventList items={AllItem} />
    </main>
  );
};

export default AllEvent;
