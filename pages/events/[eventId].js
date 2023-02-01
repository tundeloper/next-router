import Head from "next/head";
import EventContent from "../../components/event-detals/event-content";
import EventLogistics from "../../components/event-detals/event-logistics";
import EventSummary from "../../components/event-detals/event-summary";
import Comments from "../../components/input/comment";
import ErrorMessage from "../../components/ui/error-message";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetail = (props) => {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <h3>No event found</h3>;
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
      <Comments />
    </>
  );
};

export default EventDetail;

export const getStaticProps = async (context) => {
  console.log(context.params);
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      // notFound: true,
      redirect: {
        destination: "/events",
        permanent: false,
      },
    };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const event = await getFeaturedEvents();
  const paths = event.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};
