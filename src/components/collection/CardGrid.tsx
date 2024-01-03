import { ICard } from "@/types/Card";

import styles from "./CardGrid.module.scss";

import Card from "./Card";

const CardGrid = ({
  cards,
  rowNum = 2,
  isFetching = false,
}: {
  cards: ICard[];
  rowNum: number;
  isFetching?: boolean;
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ gridTemplateColumns: `repeat(${rowNum}, 1fr)` }}
    >
      {isFetching
        ? Array(100)
            .fill(0)
            .map(() => <Card isPlaceholder />)
        : cards.map((card) => <Card card={card} />)}
    </div>
  );
};

export default CardGrid;
