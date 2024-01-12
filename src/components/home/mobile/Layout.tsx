import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "./Layout.module.scss";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <header>
        <FontAwesomeIcon icon={faHome} onClick={() => navigate("/")} />
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;
