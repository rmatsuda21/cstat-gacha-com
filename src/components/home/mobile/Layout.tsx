import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <header>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;
