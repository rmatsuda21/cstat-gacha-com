import { useState } from "react";
import styles from "./CardCount.module.scss";

interface CardCountProps {
  count: number;
  maxCount: number;
  title: string;
  shortened: string;
}

const CardCount = ({ count, maxCount, title, shortened }: CardCountProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div
        className={styles.progress}
        style={{ height: `${(count / maxCount) * 100}%` }}
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
