import CardCount from "@/components/shared/CardCount";
import { rarityToShortenedMap } from "@/const/rarityToShortenedMap";
import { CardCountType } from "@/types/Card";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

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
}: {
  id: string;
  className?: string;
}) => {
  const [userCount, setUserCount] = useState<CardCountType[] | null>(null);
  const [globalCount, setGlobalCount] = useState<CardCountType[] | null>(null);
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
        setGlobalCount(data.globalCardCount);
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
    return <ErrorComp className={className} />;
  }

  if (!userCount || !globalCount) {
    return <LoadingComp className={className} />;
  }

  return (
    <div className={className}>
      {globalCount?.map((count, indx) => (
        <CardCount
          key={indx}
          count={userCount?.find((c) => c.rarity === count.rarity)?.count || 0}
          maxCount={count.count}
          title={count.rarity}
          shortened={rarityToShortenedMap[count.rarity] || count.rarity}
        />
      ))}
    </div>
  );
};

export default CardCountDisplay;
