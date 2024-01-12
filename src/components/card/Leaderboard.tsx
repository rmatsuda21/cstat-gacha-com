import { ILeaderboardUser } from "@/types/Leaderboard";

import styles from "./Leaderboard.module.scss";
import { useNavigate } from "react-router-dom";

interface LeaderboardProps {
  leaderboard?: ILeaderboardUser[];
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  const navigate = useNavigate();

  return (
    <table className={styles.wrapper}>
      <tr>
        <th>Rank</th>
        <th>Discord Tag</th>
        <th>Count</th>
      </tr>

      {leaderboard?.map((user, indx) => (
        <tr
          className={indx === 0 ? styles.first : ""}
          onClick={() => navigate(`/user/${user.discord_id}`)}
        >
          <td>{indx + 1}</td>
          <td>{user.discord_tag}</td>
          <td>{user.count}</td>
        </tr>
      ))}
    </table>
  );
};

export default Leaderboard;
