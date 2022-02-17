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
  lineups: Lineup[];
  game: string
};

export interface seasonData {
  games: gameData[];
  season: Lineup[];
  conference: Lineup[]
}

export interface totalData {
  [year:string]: seasonData
}


export interface rawData {
  [year:string] : gameData[];
}