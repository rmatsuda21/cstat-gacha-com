export interface ILeaderboard {
  rank: number;
  discord_id: string;
  discord_tag: string;
  totalCount: number;
}

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  accent_color: number;
  global_name: string;
  banner_color: string;
}
