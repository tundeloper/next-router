import { useRouter } from "next/router";
import EventContent from "../../components/event-detals/event-content";
import EventLogistics from "../../components/event-detals/event-logistics";
import EventSummary from "../../components/event-detals/event-summary";
import { getEventById } from "../../dummy-data";

const EventDetail = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <h3>No event found</h3>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetail;
