import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/result-title";
import useSWR from "swr";
import Button from "../../components/ui/button";
import ErrorMessage from "../../components/ui/error-message";
import { getFilteredEvents } from "../../helpers/api-util";
import { useEffect, useState } from "react";
import Head from "next/head";

const Filtered = (props) => {
  const [event, setEvent] = useState();
  // const { year, month } = props.date;
  const router = useRouter();
  const filteredData = router.query.slugs;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://next--routing-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const event = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          event.push({
            id: key,
            ...element,
          });
        }
      }
      setEvent(event);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>filtered events</title>
      <meta name="description" content={"A list of filtered event"} />
    </Head>
  );

  if (!event) {
    return (
      <>
        {pageHeadData}
        <ErrorMessage>
          <p>Loading</p>
        </ErrorMessage>
      </>
    );
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  pageHeadData = (
    <Head>
      <title>filtered events</title>
      <meta
        name="description"
        content={`All event for ${filteredYear} / ${filteredMonth}`}
      />
    </Head>
  );

  const filteredEvents = event.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredMonth > 12 ||
    filteredMonth < 1 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorMessage>
          <p>Invalid filter, please adjust your value</p>
        </ErrorMessage>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorMessage>
          <p>No event found for this filter!</p>
        </ErrorMessage>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <main>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </main>
  );
};

export default Filtered;

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filteredData = params.slugs;

//   const filteredYear = +filteredData[0];
//   const filteredMonth = +filteredData[1];

//   console.log(filteredYear);

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredMonth > 12 ||
//     filteredMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filterEvent = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });
//   return {
//     props: {
//       filterEvent,
//       date: { year: filteredYear, month: filteredMonth },
//     },
//   };
// };
