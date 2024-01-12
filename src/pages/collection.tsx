import CardGrid from "@/components/collection/CardGrid";

import styles from "./collection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faGripVertical,
  faHashtag,
  faSquare,
  faStar,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CardTable from "@/components/collection/CardTable";
import { ICard } from "@/types/Card";

const Collection = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [rowNum, setRowNum] = useState(
    Number(window?.sessionStorage.getItem("row")) || 2
  );
  const [sort, setSort] = useState(
    window?.sessionStorage.getItem("sort") || "id-asc"
  ); // ["id-asc", "id-desc", "rarity-asc", "rarity-desc", "count-asc", "count-desc"

  useEffect(() => {
    const fetchTest = async () => {
      setIsFetching(true);
      const res = await fetch(
        `/api/collection?id=275111230446764032&sort=${sort}`
      );
      const data = await res.json();

      const _cards = data?.res as ICard[];

      setCards(_cards);
      setIsFetching(false);
    };

    fetchTest();
  }, [sort]);

  const handleSortChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSort(e.currentTarget.id);
    window?.sessionStorage.setItem("sort", e.currentTarget.id);
  };

  const handleRowChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "singleRow") {
      setRowNum(1);
      window?.sessionStorage.setItem("row", "1");
    } else if (e.currentTarget.id === "multiRow") {
      setRowNum(2);
      window?.sessionStorage.setItem("row", "2");
    } else {
      setRowNum(-1);
      window?.sessionStorage.setItem("row", "-1");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        Your <br />
        Collection
      </h2>
      <div className={styles.filter}>
        <div className={`${styles.sort} hidescrollbar`}>
          <label>
            <input
              checked={sort === "id-asc"}
              onChange={handleSortChange}
              type="radio"
              id="id-asc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowUp} /> ID
          </label>
          <label>
            <input
              checked={sort === "id-desc"}
              onChange={handleSortChange}
              type="radio"
              id="id-desc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowDown} /> ID
          </label>
          <label>
            <input
              checked={sort === "rarity-asc"}
              onChange={handleSortChange}
              type="radio"
              id="rarity-asc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowUp} />
            <FontAwesomeIcon icon={faStar} />
          </label>
          <label>
            <input
              checked={sort === "rarity-desc"}
              onChange={handleSortChange}
              type="radio"
              id="rarity-desc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowDown} />
            <FontAwesomeIcon icon={faStar} />
          </label>
          <label>
            <input
              checked={sort === "count-asc"}
              onChange={handleSortChange}
              type="radio"
              id="count-asc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowUp} />
            <FontAwesomeIcon icon={faHashtag} />
          </label>
          <label>
            <input
              checked={sort === "count-desc"}
              onChange={handleSortChange}
              type="radio"
              id="count-desc"
              name="sort-by"
            />
            <FontAwesomeIcon icon={faArrowDown} />
            <FontAwesomeIcon icon={faHashtag} />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            <input
              checked={rowNum === 1}
              onChange={handleRowChange}
              type="radio"
              id="singleRow"
              name="row-count"
            />
            <FontAwesomeIcon icon={faSquare} />
          </label>
          <label>
            <input
              checked={rowNum === 2}
              onChange={handleRowChange}
              type="radio"
              id="multiRow"
              name="row-count"
            />
            <FontAwesomeIcon icon={faGripVertical} />
          </label>
          <label>
            <input
              checked={rowNum === -1}
              onChange={handleRowChange}
              type="radio"
              id="table"
              name="row-count"
            />
            <FontAwesomeIcon icon={faTableList} />
          </label>
        </div>
      </div>
      {rowNum > 0 ? (
        <CardGrid isFetching={isFetching} cards={cards} rowNum={rowNum} />
      ) : (
        <CardTable isFetching={isFetching} cards={cards} />
      )}
    </div>
  );
};

export default Collection;
