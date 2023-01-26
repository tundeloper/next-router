import AddressIcon from "../icons/address";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import Image from "next/image";
import classes from "./event-logistics.module.css";

function EventLogistics({ date, address, image, imageAlt }) {
  const humanDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width="300" height="300" />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
