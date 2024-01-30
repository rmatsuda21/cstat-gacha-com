import { redirect } from "react-router-dom";
import axios from "axios";

import { getDiscordAuth, setDiscordAuth, setUser } from "@/utility/auth";

export const authLoader = () => {
  const auth = getDiscordAuth();

  if (!auth) {
    return null;
  }

  return auth;
};

export const discordRedirectLoader = async () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));

  const token = fragment.get("access_token");
  const token_type = fragment.get("token_type");
  const expiration = fragment.get("expires_in");

  if (!token || !token_type || !expiration) return redirect("/");

  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + parseInt(expiration));

  const userFetch = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${token_type} ${token}`,
    },
  });

  const user = userFetch.data;

  setUser(user);
  setDiscordAuth({
    token,
    token_type,
    expirationDate: expirationDate.toISOString(),
  });

  return redirect("/");
};

export const leaderboardLoader = async () => {
  const leaderboardFetch = await fetch("/api/leaderboard");
  const leaderboard = await leaderboardFetch.json();

  return leaderboard;
};
