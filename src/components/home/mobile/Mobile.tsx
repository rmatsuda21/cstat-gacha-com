import {
  faBook,
  faHatCowboySide,
  faStore,
  faVault,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Mobile.module.scss";

import MenuItem from "@/components/home/mobile/MenuItem";
import CardCountDisplay from "@/components/shared/CardCountDisplay";

const Mobile = () => {
  const id = "321452245356904449";

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>
          <FontAwesomeIcon icon={faHatCowboySide} /> Howdy
        </h1>
        <CardCountDisplay id={id} />
      </div>
      <div className={styles.menu}>
        <MenuItem
          to={`/collection/${id}`}
          icon={faVault}
          title="Your Collection"
        />
        <MenuItem to="/cardex" icon={faBook} title="Cardex" />
        <MenuItem to="/offers" icon={faStore} title="Offers" />
      </div>
    </div>
  );
};

export default Mobile;
