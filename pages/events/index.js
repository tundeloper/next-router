import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";

const AllEvent = () => {
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullYear = `/events/${year}/${month}`;
    router.push(fullYear);
  };

  const AllItem = getAllEvents();
  return (
    <main>
      <EventSearch onSerch={findEventHandler} />
      <EventList items={AllItem} />
    </main>
  );
};

export default AllEvent;
