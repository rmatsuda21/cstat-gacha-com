import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import styles from "./leaderboard.module.scss";

import { ILeaderboard } from "@/types/User";

const Leaderboard = () => {
  const data = useLoaderData() as any;
  const leaderboard = data?.leaderboard as ILeaderboard[];

  const navigate = useNavigate();

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <div className={styles.placement}>
        <div
          className={styles.first}
          onClick={() => navigate(`/user/${leaderboard[0].discord_id}`)}
        >
          <FontAwesomeIcon icon={faCrown} />
          <h3>{leaderboard[0].discord_tag}</h3>
          <span>{leaderboard[0].totalCount}</span>
        </div>
        <div
          className={styles.second}
          onClick={() => navigate(`/user/${leaderboard[1].discord_id}`)}
        >
          <h2>2</h2>
          <h3>{leaderboard[1].discord_tag}</h3>
          <span>{leaderboard[1].totalCount}</span>
        </div>
        <div
          className={styles.third}
          onClick={() => navigate(`/user/${leaderboard[2].discord_id}`)}
        >
          <h2>3</h2>
          <h3>{leaderboard[2].discord_tag}</h3>
          <span>{leaderboard[2].totalCount}</span>
        </div>
        {leaderboard.slice(3).map((user, i) => (
          <div
            className={styles.row}
            key={user.discord_id}
            onClick={() => navigate(`/user/${user.discord_id}`)}
          >
            <h2>{i + 4}</h2>
            <h3>{user.discord_tag}</h3>
            <span>{user.totalCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
