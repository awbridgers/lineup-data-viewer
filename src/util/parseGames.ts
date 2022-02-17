import { Lineup } from '../lineupClass';
import { gameData } from '../types';

export const parseData = (games: gameData[], conference: boolean):Lineup[]=>{
  const lineupData:Lineup[] = [];
  const gameData = games.filter((opp)=>conference ? opp.accGame : true);
  gameData.forEach((x)=>{
    x.lineups.forEach((lineup)=>{
      
      const index = lineupData.findIndex((x)=>x.players === lineup.players);
      if(index === -1){
        lineupData.push(new Lineup(lineup));  //create a new lineup so the original data isn't altered
      }else{
        if(lineupData[index].players === 'Alondes Williams-Daivien Williamson-Dallas Walton-Isaiah Mucius-Jake LaRavia' && conference){
        }
        lineupData[index].combineLineup(lineup)
      }
    })
  })
  return lineupData;
}