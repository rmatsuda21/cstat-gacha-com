import { ICard } from "@/types/Card";

import styles from "./CardTable.module.scss";
import { useNavigate } from "react-router-dom";

interface CardTableProps {
  cards: ICard[];
  isFetching?: boolean;
}

const CardTable = ({ cards, isFetching = false }: CardTableProps) => {
  const navigate = useNavigate();

  if (isFetching)
    return (
      <div className={`${styles.wrapper} ${styles.fetching}`}>
        <table>
          <tr>
            <th>ID</th>
            <th>Rarity</th>
            <th>Name</th>
            <th>Count</th>
          </tr>
          {Array(20)
            .fill(0)
            .map(() => (
              <tr>
                <td>
                  <div />
                </td>
                <td>
                  <div />
                </td>
                <td>
                  <div />
                </td>
                <td>
                  <div />
                </td>
              </tr>
            ))}
        </table>
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <table>
        <tr>
          <th>ID</th>
          <th>Rarity</th>
          <th>Name</th>
          <th>Count</th>
        </tr>
        {cards.map((card) => (
          <tr onClick={() => navigate(`/card/${card.tag}`)}>
            <td>{card.id}</td>
            <td>{card.rarity}</td>
            <td>{card.name}</td>
            <td>{card.count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CardTable;
