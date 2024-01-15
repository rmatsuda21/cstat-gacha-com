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
          <tbody>
            <tr>
              <th>ID</th>
              <th>Rarity</th>
              <th>Name</th>
              <th>Count</th>
            </tr>
            {Array(20)
              .fill(0)
              .map((_, indx) => (
                <tr key={indx}>
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
          </tbody>
        </table>
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Rarity</th>
            <th>Name</th>
            <th>Count</th>
          </tr>
          {cards.map((card) => (
            <tr key={card.tag} onClick={() => navigate(`/card/${card.tag}`)}>
              <td>{card.id}</td>
              <td>{card.rarity}</td>
              <td>{card.name}</td>
              <td>{card.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
