import Image from "next/image";
import AddressIcon from "../icons/address";
import ArrowRIght from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import classes from "./event-item.module.css";

const EventItem = ({ title, image, date, location, id }) => {
  const humanDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatedAddress = location.replace(", ", "\n");

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width="100" height="330" priority />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRIght />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
