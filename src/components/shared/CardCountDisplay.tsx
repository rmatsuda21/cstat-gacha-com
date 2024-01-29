import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

import styles from "./CardCountDisplay.module.scss";

import CardCount from "@/components/shared/CardCount";
import { CardCountType } from "@/types/Card";
import { rarityToShortenedMap } from "@/const/rarityToShortenedMap";

const ErrorComp = ({ className }: { className?: string }) => (
  <div className={className}>
    {Array(8)
      .fill(0)
      .map((_, indx) => (
        <CardCount key={indx} isError />
      ))}
  </div>
);

const LoadingComp = ({ className }: { className?: string }) => (
  <div className={className}>
    {Array(8)
      .fill(0)
      .map((_, indx) => (
        <CardCount key={indx} isLoading />
      ))}
  </div>
);

const CardCountDisplay = ({
  id,
  className,
  showTotal = true,
}: {
  id: string;
  className?: string;
  showTotal?: boolean;
}) => {
  const [userCount, setUserCount] = useState<CardCountType[] | null>(null);
  const [rarityCardCount, setRarityCardCount] = useState<
    CardCountType[] | null
  >(null);
  const [globalCount, setGlobalCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/user-card-count?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          throw new Error(data.error);
        }

        setUserCount(data.cardCount);
        setGlobalCount(data.globalCardCount[0].count);
        setRarityCardCount(data.rarityCardCount);
      })
      .catch((err) => {
        setError(true);
        enqueueSnackbar(String(err), {
          variant: "error",
          autoHideDuration: 1500,
        });
      });
  }, [id]);

  if (error) {
    return <ErrorComp className={className || styles.counts} />;
  }

  if (!userCount || !globalCount || !rarityCardCount) {
    return <LoadingComp className={className || styles.counts} />;
  }

  const totalCount = userCount.reduce((acc, curr) => acc + curr.count, 0);
  const totalCountStyle = {
    "--totalCountPercent": `${((totalCount || 0) / globalCount) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className={className || styles.wrapper}>
      <div className={styles.counts}>
        {rarityCardCount?.map((count, indx) => (
          <CardCount
            key={indx}
            count={
              userCount?.find((c) => c.rarity === count.rarity)?.count || 0
            }
            maxCount={count.count}
            title={count.rarity}
            shortened={rarityToShortenedMap[count.rarity] || count.rarity}
          />
        ))}
      </div>
      {showTotal && (
        <div className={styles.totalCount} style={totalCountStyle}>
          <span>
            {totalCount} / {globalCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardCountDisplay;
