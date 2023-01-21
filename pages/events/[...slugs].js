import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";
import styles from "../";

const Filtered = () => {
  const router = useRouter();
  const filteredData = router.query.slugs;
  if (!filteredData) {
    return <h2 className="center">Loading</h2>;
  }
  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];
  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredMonth > 12 ||
    filteredMonth < 1
  ) {
    return <h2 className="center">Invalid filter, please adjust your value</h2>;
  }

  const filterEvent = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filterEvent || filterEvent.length === 0) {
    return <h2 className="center">No event found for this filter!</h2>;
  }
  return (
    <main className={styles.main}>
      <EventList items={filterEvent} />
    </main>
  );
};

export default Filtered;
