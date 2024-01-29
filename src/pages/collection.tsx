import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import styles from "./collection.module.scss";

import { ICard } from "@/types/Card";
import CardGrid from "@/components/collection/CardGrid";
import CardTable from "@/components/collection/CardTable";
import Filter from "@/components/collection/Filter";
import ScrollingText from "@/components/shared/ScrollingText";

const CollectionPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [rowNum, setRowNum] = useState(
    Number(window?.sessionStorage.getItem("row")) || 2
  );
  const [sort, setSort] = useState(
    window?.sessionStorage.getItem("sort") || "id-asc"
  ); // ["id-asc", "id-desc", "rarity-asc", "rarity-desc", "count-asc", "count-desc"

  const params = useParams();
  const headerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchTest = async () => {
      setIsFetching(true);
      const res = await fetch(`/api/collection?id=${params.id}&sort=${sort}`);
      const data = await res.json();

      const _cards = data?.res as ICard[];
      const _user = data?.user;

      setCards(_cards);
      setUser(_user);
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

  useEffect(() => {
    // If header's width is larger than the screen,
    // Add a scrolling animation to the header
    if (headerRef.current) {
      const headerWidth = headerRef.current.getBoundingClientRect().width;
      const parentWidth =
        headerRef.current.parentElement?.getBoundingClientRect().width || 0;

      console.log(headerWidth, parentWidth);

      if (headerWidth > parentWidth) {
        headerRef.current.style.setProperty(
          "--scrollWidth",
          `-${headerWidth - parentWidth}px`
        );
        headerRef.current.classList.add(styles.animate);
      } else {
        headerRef.current.classList.remove(styles.animate);
      }
    }
  }, [headerRef.current]);

  if (!user || !cards) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon icon={faSpinner} />
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isFetching && cards.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>
          {user?.global_name || user?.username}'s <br />
          Collection
        </h2>
        <div className={styles.noCards}>
          <p>No cards?</p>
          <p>Go get some in our discord!</p>
          <Link to="https://discord.gg/TH3MmvTu67">
            <FontAwesomeIcon icon={faDiscord} />
            Join Discord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        <ScrollingText>{user?.global_name || user?.username}'s</ScrollingText>
        <br />
        Collection
      </h2>
      <Filter
        sort={sort}
        rowNum={rowNum}
        handleSortChange={handleSortChange}
        handleRowChange={handleRowChange}
      />
      {rowNum > 0 ? (
        <CardGrid isFetching={isFetching} cards={cards} rowNum={rowNum} />
      ) : (
        <CardTable isFetching={isFetching} cards={cards} />
      )}
    </div>
  );
};

export default CollectionPage;
