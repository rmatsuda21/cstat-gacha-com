import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ICard, Rarity } from "@/types/Card";

import styles from "./card.module.scss";
import Leaderboard from "@/components/card/Leaderboard";
import { ILeaderboardUser } from "@/types/Leaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

const CardPage = () => {
  const [fetching, setFetching] = useState(true);
  const [card, setCard] = useState<ICard | undefined>();
  const [leaderboard, setLeaderboard] = useState<
    ILeaderboardUser[] | undefined
  >();

  const params = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      setFetching(true);
      try {
        const res = await fetch(`/api/card?tag=${params?.tag}`);
        const data = await res.json();

        console.log(data);

        const _card = data?.data as ICard;
        const _leaderboard = data?.leaderboard as ILeaderboardUser[];

        setCard(_card);
        setLeaderboard(_leaderboard);
      } catch (e) {
        console.log(e);
      }
      setFetching(false);
    };

    fetchCard();
  }, []);

  if (fetching) {
    return (
      <div className={styles.fetching}>
        <h3>Fetching...</h3>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={styles.notFound}>
        <h3>Card not found</h3>
      </div>
    );
  }

  const rarityColor = () => {
    const rarityColors: { [Property in Rarity]: string } = {
      Common: "#bbb",
      Rare: "#bbb",
      "Super Rare": "#bbb",
      "Ultimate Rare": "#bbb",
      "Ghost Rare": "#bbb",
      Doubles: "#bbb",
      Promo: "#bbb",
      Utility: "#bbb",
    };

    return rarityColors[card.rarity] || "#bbb";
  };

  const numInRotation = () => {
    return leaderboard?.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>#{card.id}</span>
        <span>Wave {card.wave}</span>
      </div>
      <h1>{card.name}</h1>
      <div className={styles.header}>
        <h5 className={styles.rarity} style={{ color: rarityColor() }}>
          {card.rarity}
        </h5>
        <span>{numInRotation()} in rotation</span>
      </div>

      <div className={styles.imgWrapper}>
        <img src={card.img} />
      </div>

      <h3>
        <FontAwesomeIcon icon={faRankingStar} /> Leaderboard
      </h3>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default CardPage;
