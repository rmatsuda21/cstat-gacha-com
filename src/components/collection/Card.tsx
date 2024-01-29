import { useNavigate } from "react-router-dom";

import styles from "./Card.module.scss";

import { ICard } from "@/types/Card";

const Card = ({
  card,
  isPlaceholder = false,
  showId = false,
}: {
  card?: ICard;
  isPlaceholder?: boolean;
  showId?: boolean;
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

  if (card.tag === "??") {
    return (
      <div className={styles.card}>
        {showId && <div className={styles.id}>{card.id}</div>}
        <div className={styles.missing}>?</div>
      </div>
    );
  }

  return (
    <div className={styles.card} onClick={() => navigate(`/card/${card.tag}`)}>
      {showId && <div className={styles.id}>{card.id}</div>}
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
