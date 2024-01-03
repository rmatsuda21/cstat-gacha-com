import { ICard } from "@/types/Card";

import styles from "./Card.module.scss";

const Card = ({
  card,
  isPlaceholder = false,
}: {
  card?: ICard;
  isPlaceholder?: boolean;
}) => {
  return (
    <div className={styles.card}>
      {!isPlaceholder && <div className={styles.count}>12</div>}
      {isPlaceholder ? (
        <div className={styles.activity}></div>
      ) : (
        <img src="https://i.postimg.cc/zfBXywwj/reo-m.jpg" />
      )}
    </div>
  );
};

export default Card;
