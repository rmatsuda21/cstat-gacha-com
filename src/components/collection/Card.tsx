import { ICard } from "@/types/Card";

import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

const Card = ({
  card,
  isPlaceholder = false,
}: {
  card?: ICard;
  isPlaceholder?: boolean;
}) => {
  const navigate = useNavigate();

  if (isPlaceholder) {
    return (
      <div className={styles.card}>
        <div className={styles.activity}></div>
      </div>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <div className={styles.card} onClick={() => navigate(`/card/${card.tag}`)}>
      {!isPlaceholder && <div className={styles.count}>{card.count}</div>}
      {isPlaceholder ? (
        <div className={styles.activity}></div>
      ) : (
        <img src={card.img} />
      )}
    </div>
  );
};

export default Card;
