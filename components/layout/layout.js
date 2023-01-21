import Link from "next/link";
import MainHeader from "./main-hearder";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};
export default Layout;
