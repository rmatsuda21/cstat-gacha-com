import { useState } from "react";
import styles from "./CardCount.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface CardCountProps {
  isLoading?: boolean;
  isError?: boolean;
  count?: number;
  maxCount?: number;
  title?: string;
  shortened?: string;
}

const CardCount = ({
  isLoading,
  isError,
  count = 0,
  maxCount = 1,
  title = "",
  shortened = "",
}: CardCountProps) => {
  const [expanded, setExpanded] = useState(false);

  if (isError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loader}>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div
        className={styles.progress}
        style={{
          maxHeight: `${(count / maxCount) * 100}%`,
        }}
      />
      <div className={styles.body + ` ${expanded ? styles.expanded : ""}`}>
        {expanded ? (
          <>
            <span>
              {count}
              <br />
              {maxCount}
            </span>
            <span>{title}</span>
          </>
        ) : (
          <>
            <span>{count}</span>
            <span>{shortened}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CardCount;
