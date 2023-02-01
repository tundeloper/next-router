import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificatioCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    notificatioCtx.showNotification({
      title: "signing up",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((error) => {
          throw new Error(error.message || "something went wrong");
        });
      })
      .then((data) => {
        notificatioCtx.showNotification({
          title: "sucess",
          message: "Successfully registerd for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificatioCtx.showNotification({
          title: "error",
          message: error.message || "something went wrong ",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
