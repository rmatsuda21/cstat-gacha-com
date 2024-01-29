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
  showId = false,
}: {
  cards: ICard[];
  rowNum: number;
  isFetching?: boolean;
  showId?: boolean;
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ gridTemplateColumns: `repeat(${rowNum}, 1fr)` }}
    >
      {isFetching ? (
        <Loader />
      ) : (
        cards.map((card, indx) => (
          <Card key={`${card.tag}-${indx}`} card={card} showId={showId} />
        ))
      )}
    </div>
  );
};

export default CardGrid;
