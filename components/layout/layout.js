import Link from "next/link";
import Notification from "../ui/notification";
import MainHeader from "./main-hearder";
import { useContext } from "react";
import NotificationContext from "../../store/notification-context";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};
export default Layout;
