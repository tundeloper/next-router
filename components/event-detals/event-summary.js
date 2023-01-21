import classes from "./event-summary.module.css";

function EventSummary({ title }) {
  return (
    <section className={classes.summary}>
      <h2>{title}</h2>
    </section>
  );
}

export default EventSummary;
