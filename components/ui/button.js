import Link from "next/link";
import classes from "./button.module.css";

const Button = (props) => {
  if (props.link)
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );

  return (
    <button type="submit" className={classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
