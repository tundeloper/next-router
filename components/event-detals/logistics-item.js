import classes from "./logistics-item.module.css";

function LogisticsItem(props) {
  const { icon: Icon } = props;
  console.log(Icon);
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
