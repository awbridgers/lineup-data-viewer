import { Lineup } from './lineupClass';

export interface player{
  name: string;
  number: number;
}

export interface gameData {
  score: {
    wake: number;
    opp: number;
  }
  accGame: boolean;
  order: number;
  stats: gameStats;
  game: string
};

export interface gameStats{
  lineups: Lineup[];
  players: Lineup[];
}

export interface seasonData {
  games: gameData[];
  season: gameStats;
  conference: gameStats;
}

export interface totalData {
  [year:string]: seasonData
}


export interface rawData {
  [year:string] : gameData[];
}
export interface finderPlayer {
  name: string;
  type: 'omit'| 'include'
}