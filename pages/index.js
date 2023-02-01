import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import EventList from "../components/events/event-list";
// import { getAllEvents, getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function Home({ events }) {
  getFeaturedEvents();
  const featuredList = getFeaturedEvents();
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Event</title>
        <meta
          name="description"
          content="find a lot of greate event that alllow you to evolve"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NewsletterRegistration />
        <EventList items={events} />
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvent = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800,
  };
};

// https://heroicons.com
