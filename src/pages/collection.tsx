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
import { useState } from "react";

const Collection = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [rowNum, setRowNum] = useState(2);
  const [sort, setSort] = useState("id-asc"); // ["id-asc", "id-desc", "rarity-asc", "rarity-desc", "count-asc", "count-desc"

  const handleSortChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSort(e.currentTarget.id);
    setIsFetching(true);
  };

  const handleRowChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "singleRow") {
      setRowNum(1);
    } else if (e.currentTarget.id === "multiRow") {
      setRowNum(2);
    } else {
      setRowNum(-1);
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
        <CardGrid
          isFetching={isFetching}
          cards={Array(10).fill(0)}
          rowNum={rowNum}
        />
      ) : (
        <>TBD</>
      )}
    </div>
  );
};

export default Collection;
