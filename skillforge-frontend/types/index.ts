export type RootStackParamList = {
  Home: undefined;
  Quest: { quest: { topic: string; challenge: string } };
  Battle: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};


export interface Quest {
  topic: string;
  challenge: string;
}

export interface Skill {
  name: string;
  level: number;
}
