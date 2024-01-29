import {
  faBook,
  faCrown,
  faHatCowboySide,
  faStore,
  faVault,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLoaderData } from "react-router-dom";

import styles from "./Mobile.module.scss";

import MenuItem from "@/components/home/mobile/MenuItem";
import CardCountDisplay from "@/components/shared/CardCountDisplay";
import { ILeaderboard, IUser } from "@/types/User";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const discordAuthUrl = () => {
  const params = new URLSearchParams();
  params.set("client_id", import.meta.env.VITE_DISCORD_CLIENT_ID || "");
  params.set("response_type", "token");
  params.set("redirect_uri", window.location + "auth/discord");
  params.set("scope", "identify");
  const baseUrl = `https://discord.com/api/oauth2/authorize?`;
  const url = baseUrl + params.toString();

  return url;
};

const Leaderboard = ({ leaderboard }: { leaderboard: ILeaderboard[] }) => {
  return (
    <div className={styles.leaderboard}>
      <h2>Collection Leaderboard</h2>
      <div className={styles.placement}>
        <div className={styles.first}>
          <FontAwesomeIcon icon={faCrown} />
          <h2>{leaderboard[0].discord_tag}</h2>
          <span>{leaderboard[0].totalCount}</span>
        </div>
        <div className={styles.second}>
          <h1>2</h1>
          <h2>{leaderboard[1].discord_tag}</h2>
          <span>{leaderboard[1].totalCount}</span>
        </div>
        <div className={styles.third}>
          <h1>3</h1>
          <h2>{leaderboard[2].discord_tag}</h2>
          <span>{leaderboard[2].totalCount}</span>
        </div>
      </div>
      <Link to="/leaderboard">View More</Link>
    </div>
  );
};

const Mobile = () => {
  const data = useLoaderData() as IUser & { leaderboard: ILeaderboard[] };

  const id = data?.id;
  const leaderboard = data?.leaderboard;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>
          <FontAwesomeIcon icon={faHatCowboySide} /> Howdy
        </h1>
        {id && <CardCountDisplay id={id} />}
        {!id && (
          <div className={styles.noUser}>
            <h3>Connect with Discord to view your stats!</h3>

            <a href={discordAuthUrl()}>
              <FontAwesomeIcon icon={faDiscord} /> Login
            </a>
          </div>
        )}
      </div>

      <div className={styles.menu}>
        {id && (
          <MenuItem
            to={`/collection/${id}`}
            icon={faVault}
            title="Your Collection"
          />
        )}
        <MenuItem to="/cardex" icon={faBook} title="Cardex" />
        <MenuItem to="/offers" icon={faStore} title="Offers" />
      </div>

      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default Mobile;
