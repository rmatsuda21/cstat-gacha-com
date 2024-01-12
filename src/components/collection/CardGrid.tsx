import { ICard } from "@/types/Card";

import styles from "./CardGrid.module.scss";

import Card from "./Card";

const Loader = () =>
  Array(10)
    .fill(0)
    .map((_, indx) => <Card key={indx} isPlaceholder />);

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
      {isFetching ? (
        <Loader />
      ) : (
        cards.map((card) => <Card key={card.tag} card={card} />)
      )}
    </div>
  );
};

export default CardGrid;
