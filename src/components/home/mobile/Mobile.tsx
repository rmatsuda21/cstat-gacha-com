import {
  faBook,
  faHatCowboySide,
  faStore,
  faVault,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Mobile.module.scss";

import MenuItem from "./MenuItem";
import CardCount from "./CardCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Mobile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>
          <FontAwesomeIcon icon={faHatCowboySide} /> Howdy
        </h1>
        <div>
          <CardCount
            count={1}
            maxCount={500}
            title="Ghost Rare"
            shortened="GR"
          />
          <CardCount
            count={1}
            maxCount={500}
            title="Ultimate Rare"
            shortened="UR"
          />
          <CardCount
            count={1}
            maxCount={500}
            title="Super Rare"
            shortened="SR"
          />
          <CardCount count={1} maxCount={500} title="Rare" shortened="R" />
          <CardCount count={100} maxCount={500} title="Promo" shortened="Pr" />
          <CardCount count={1} maxCount={500} title="Double" shortened="D" />
          <CardCount count={1} maxCount={500} title="Utility" shortened="Ut" />
          <CardCount count={1} maxCount={500} title="Common" shortened="C" />
        </div>
      </div>
      <div className={styles.menu}>
        <MenuItem to="/collection" icon={faVault} title="Your Collection" />
        <MenuItem to="/cardex" icon={faBook} title="Cardex" />
        <MenuItem to="/offers" icon={faStore} title="Offers" />
      </div>
    </div>
  );
};

export default Mobile;
