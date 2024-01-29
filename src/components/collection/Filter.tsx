import {
  faArrowDown,
  faArrowUp,
  faGripVertical,
  faHashtag,
  faSquare,
  faStar,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Filter.module.scss";

interface IFilterProps {
  sort?: string;
  handleSortChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  rowNum: number;
  handleRowChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Filter = ({
  sort,
  handleSortChange,
  rowNum,
  handleRowChange,
}: IFilterProps) => {
  return (
    <div className={styles.filter}>
      <div className={`${styles.sort} hidescrollbar`}>
        {sort && (
          <>
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
          </>
        )}
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
  );
};

export default Filter;
