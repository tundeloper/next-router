import Button from "../ui/button";
import classes from "./result-title.module.css";
const ResultTitle = ({ date }) => {
  console.log(date);
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};
export default ResultTitle;
