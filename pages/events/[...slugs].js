import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
// import { getFilteredEvents } from "../../dummy-data";
import ResultTitle from "../../components/events/result-title";
import Button from "../../components/ui/button";
import ErrorMessage from "../../components/ui/error-message";
import { getFilteredEvents } from "../../helpers/api-util";

const Filtered = (props) => {
  const router = useRouter();
  const filteredData = router.query.slugs;

  // if (!filteredData) {
  //   return (
  //     <>
  //       <ErrorMessage>
  //         <p>Loading</p>
  //       </ErrorMessage>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  // const filteredYear = +filteredData[0];
  // const filteredMonth = +filteredData[1];

  if (props.hasError) {
    return (
      <>
        <ErrorMessage>
          <p>Invalid filter, please adjust your value</p>
        </ErrorMessage>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filterEvent = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filterEvent || filterEvent.length === 0) {
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
      <EventList items={props.filterEvent} />
    </main>
  );
};

export default Filtered;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const filteredData = params.slugs;

  // if (!filteredData) {
  //   return (
  //     <>
  //       <ErrorMessage>
  //         <p>Loading</p>
  //       </ErrorMessage>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];
  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredMonth > 12 ||
    filteredMonth < 1
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filterEvent = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });
  return {
    props: {
      filterEvent,
    },
  };
};
