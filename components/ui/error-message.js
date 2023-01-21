import classes from "./error-message.module.css";

const ErrorMessage = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorMessage;
