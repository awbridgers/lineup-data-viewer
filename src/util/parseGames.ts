import {Lineup} from '../lineupClass';
import {gameData, gameStats} from '../types';


export const parseData = (games: gameData[], conference: boolean): gameStats => {
  const lineupData: Lineup[] = [];
  const gameData = games.filter((opp) => (conference ? opp.accGame : true));
  gameData.forEach((x) => {
    x.stats.lineups.forEach((lineup) => {
      const index = lineupData.findIndex((x) => x.players === lineup.players);
      if (index === -1) {
        const temp = new Lineup(lineup.players);
        temp.combineLineup(lineup);
        lineupData.push(temp); //create a new lineup so the original data isn't altered
      } else {
        lineupData[index].combineLineup(lineup);
      }
    });
  });
  return ({
    lineups: lineupData,
    players: parsePlayers(lineupData)
  });
};

export const parsePlayers = (
  lineups: Lineup[],
): Lineup[] => {
  const playerData: Lineup[] = [];
  //create a new lineup with each individual player and cumulate their stats
    lineups.forEach((lineup) => {
      lineup.players.split('-').forEach((player) => {
        const index = playerData.findIndex((x) => x.players === player);
        if(index === -1){
          //player is not yet in the array
          const tempLineup = new Lineup(player);
          tempLineup.combineLineup(lineup);
          playerData.push(tempLineup)
        }else{
          playerData[index].combineLineup(lineup)
        }
      });
    });
  ;
  return playerData;
};
