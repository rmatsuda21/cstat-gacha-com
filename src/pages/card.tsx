import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import styles from "./card.module.scss";

import { ICard, Rarity } from "@/types/Card";
import Leaderboard from "@/components/card/Leaderboard";
import { ILeaderboardUser } from "@/types/Leaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import ScrollingText from "@/components/shared/ScrollingText";

// const MAX_TILT = 30;

// const defaultOrientation = {
//   alpha: 0,
//   beta: 0,
//   gamma: 0,
// };

// const clamp = (num: number, min: number, max: number) => {
//   return Math.min(Math.max(num, min), max);
// };

// type Orientation = {
//   alpha: number;
//   beta: number;
//   gamma: number;
// };

const Card = ({ img }: { img: string }) => {
  const [active, setActive] = useState(false);
  // const cardRef = useRef<HTMLDivElement>(null);

  // TODO: Come back to the card tilt later
  // const [origin, setOrigin] = useState<Orientation | null>(null);
  // const [orientation, setOrientation] = useState<Orientation | null>(
  //   defaultOrientation
  // );

  // const handleOrientation = useCallback(
  //   (event: DeviceOrientationEvent) => {
  //     if (!event.alpha || !event.beta || !event.gamma) return;

  //     if (!origin)
  //       setOrigin({
  //         alpha: event.alpha,
  //         beta: event.beta,
  //         gamma: event.gamma,
  //       });

  //     setOrientation({
  //       alpha: event.alpha,
  //       beta: event.beta,
  //       gamma: event.gamma,
  //     });
  //   },
  //   [origin]
  // );

  // const handleResetClick = () => {
  //   setOrigin(orientation);
  // };

  // useEffect(() => {
  //   if (
  //     typeof window.DeviceOrientationEvent !== "undefined" &&
  //     typeof (DeviceOrientationEvent as any).requestPermission === "function"
  //   ) {
  //     (DeviceOrientationEvent as any)
  //       .requestPermission()
  //       .then((permissionState: string) => {
  //         if (permissionState === "granted") {
  //           window.addEventListener(
  //             "deviceorientation",
  //             handleOrientation,
  //             true
  //           );
  //         }
  //       })
  //       .catch(console.error);
  //   } else {
  //     window.addEventListener("deviceorientation", handleOrientation, true);
  //   }
  //   return () => {
  //     window.removeEventListener("deviceorientation", handleOrientation, true);
  //   };
  // }, [origin]);

  const className = classNames(styles.imgWrapper, {
    [styles.active]: active,
  });

  // const xDeg = clamp(
  //   (orientation?.beta || 0) - (origin?.beta || 0),
  //   -MAX_TILT,
  //   MAX_TILT
  // );

  // const yDeg = clamp(
  //   (orientation?.alpha || 0) - (origin?.alpha || 0),
  //   -MAX_TILT,
  //   MAX_TILT
  // );

  // const style =
  //   orientation && origin
  //     ? {
  //         "--x-rot": `${xDeg}deg`,
  //         "--y-rot": `${yDeg}deg`,
  //       }
  //     : {
  //         "--x-rot": 0,
  //         "--y-rot": 0,
  //       };

  return (
    <div className={className}>
      <img src={img} onClick={() => setActive((prev) => !prev)} />
      {/* {active && <button onClick={handleResetClick}>Reset</button>} */}
      {active && <div className={styles.overlay}></div>}
    </div>
  );
};

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

  const numInRotation = leaderboard?.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>#{card.id}</span>
        <span>Wave {card.wave}</span>
      </div>
      <ScrollingText as={"h1"}>{card.name}</ScrollingText>
      <div className={styles.header}>
        <h5 className={styles.rarity} style={{ color: rarityColor() }}>
          {card.rarity}
        </h5>
        <span>{numInRotation} in rotation</span>
      </div>

      <Card img={card.img} />

      <h3>
        <FontAwesomeIcon icon={faRankingStar} /> Leaderboard
      </h3>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default CardPage;
