import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";

const AllEvent = ({ allEvets }) => {
  const router = useRouter();
  const findEventHandler = (year, month) => {
    const fullYear = `/events/${year}/${month}`;
    router.push(fullYear);
  };

  return (
    <>
      <Head>
        <title>all Events</title>
        <meta
          name="description"
          color="find a lot of greate event that alllow you to evolve"
        />
      </Head>
      <EventSearch onSerch={findEventHandler} />
      <EventList items={allEvets} />
    </>
  );
};

export default AllEvent;

export const getServerSideProps = async () => {
  const allItem = await getAllEvents();
  return {
    props: {
      allEvets: allItem,
    },
  };
};
