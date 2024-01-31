import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./collection.module.scss";

import CardGrid from "@/components/collection/CardGrid";
import CardTable from "@/components/collection/CardTable";
import { ICard } from "@/types/Card";
import Filter from "@/components/collection/Filter";

const CardexPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [rowNum, setRowNum] = useState(
    Number(window?.sessionStorage.getItem("row")) || 2
  );

  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`/api/cardex`);
      const data = await res.json();

      const _cards = data?.res as ICard[];

      setCards(_cards);
    };

    try {
      setIsFetching(true);
      fetchTest();
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  }, []);

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

  if (!cards) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon icon={faSpinner} />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        <FontAwesomeIcon icon={faBook} /> Cardex
      </h2>
      <Filter rowNum={rowNum} handleRowChange={handleRowChange} />
      {rowNum > 0 ? (
        <CardGrid
          isFetching={isFetching}
          cards={cards}
          rowNum={rowNum}
          showId
        />
      ) : (
        <CardTable isFetching={isFetching} cards={cards} />
      )}
    </div>
  );
};

export default CardexPage;
