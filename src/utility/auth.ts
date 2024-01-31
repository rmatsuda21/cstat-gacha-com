import { IUser } from "@/types/User";

export const getDiscordAuth = () => {
  const user = localStorage.getItem("user");
  const auth = localStorage.getItem("discord-auth");

  if (!auth || !user) return null;

  const { expirationDate } = JSON.parse(auth);
  const currentDate = new Date();
  const isExpired = currentDate > new Date(expirationDate);

  if (isExpired) {
    localStorage.removeItem("user");
    localStorage.removeItem("discord-auth");
    return null;
  }

  return JSON.parse(user);
};

export const setUser = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

interface IDiscordAuth {
  token: string;
  expirationDate: string;
  token_type: string;
}

export const setDiscordAuth = (auth: IDiscordAuth) => {
  localStorage.setItem("discord-auth", JSON.stringify(auth));
};

export const clearDiscordAuth = () => {
  localStorage.removeItem("discord-auth");
};
