import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { enqueueSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faVault,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./user.module.scss";

import { ILeaderboard, IUser } from "@/types/User";
import CardCountDisplay from "@/components/shared/CardCountDisplay";
import MenuItem from "@/components/home/mobile/MenuItem";

const UserPage = () => {
  const [user, setUser] = useState<IUser | { error: boolean } | null>(null);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[] | null>(null);
  const [globalCardCount, setGlobalCardCount] = useState<number>(0);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user?id=${params.id}`);
        const data = await res.json();

        setUser(data.user);
        setLeaderboard(data.leaderboard);
        setGlobalCardCount(data.globalCardCount[0].count);
      } catch (err) {
        setUser({ error: true });
      }
    };

    fetchUser();
  }, [params.id]);

  if (!params.id) {
    return (
      <div className={styles.notFound}>
        <h2>No user id provided</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }
  if ("error" in user) {
    return (
      <div className={styles.notFound}>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <h2>User not found</h2>
      </div>
    );
  }

  const userImage = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=128`;
  const rank = leaderboard?.find((u) => u.discord_id === user.id) || null;

  const handleUserNameClick = () => {
    copy(user.username);
    enqueueSnackbar("Copied username to clipboard", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };

  const totalCountStyle = {
    "--totalCountPercent": `${
      ((rank?.totalCount || 0) / globalCardCount) * 100
    }%`,
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={userImage} alt="avatar" />
        <div className={styles.info} onClick={handleUserNameClick}>
          {rank && <p className={styles.rank}>Rank #{rank?.rank}</p>}
          <p className={styles.name}>{user.global_name}</p>
          <p className={styles.username}>{user.username}</p>
        </div>
      </div>
      <div className={styles.cardCountWrapper}>
        <CardCountDisplay id={params.id} className={styles.cardCount} />
        <div className={styles.totalCount} style={totalCountStyle}>
          <span>
            {rank?.totalCount} / {globalCardCount}
          </span>
        </div>
      </div>
      <MenuItem
        to={`/collection/${params.id}`}
        icon={faVault}
        title="View Collection"
      />
      <h2 style={{ textAlign: "center", margin: "auto" }}>More to come 👀</h2>
    </div>
  );
};

export default UserPage;
