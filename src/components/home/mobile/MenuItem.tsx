import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./MenuItem.module.scss";

const MenuItem = ({
  to,
  icon,
  title,
}: {
  to: string;
  icon: IconProp;
  title: string;
}) => {
  return (
    <Link to={to} className={styles.menuItem}>
      <FontAwesomeIcon icon={icon} />
      <p>{title}</p>
    </Link>
  );
};

export default MenuItem;
