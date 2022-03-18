import {getDatabase, ref, get} from 'firebase/database';
import firebase from '../firebaseConfig';
import {createContext, ReactNode, useEffect, useState} from 'react';
import { Lineup } from '../lineupClass';
import { gameData, rawData, totalData } from '../types';
import { parseData, parsePlayers } from '../util/parseGames';

interface IProvider  {
  children: ReactNode
}
export const FirebaseContext = createContext<totalData | undefined>({});

const FirebaseProvider = ({children}:IProvider) => {
  const [data, setData] = useState<totalData>()
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(firebase);
      const lineupRef = ref(db,'lineupData');
      const data = await get(lineupRef);
      let results: {[key:string] : any} = {};
      data.forEach((year)=>{
        const yearKey = year.key!
        const gameArray:gameData[] = []
        year.forEach((game)=>{
          const lineups :Lineup[] = [];
          game.child('lineups').forEach((lineup)=>{
            const unit = {...lineup.val(), players: lineup.key}
            lineups.push(new Lineup(unit))
          })
          gameArray.push({...game.val(), game: game.key!.replace(/_/g, ' '), lineups: lineups})
        })
        results[yearKey] = {
          games: gameArray.sort((a,b)=>a.order - b.order),
          season: parseData(gameArray, false),
          conference: parseData(gameArray, true),
          player: parsePlayers(gameArray, false)
        }
      })
      setData(results)
    };
    fetchData();
  }, []);
  return <FirebaseContext.Provider value={data}>{children}</FirebaseContext.Provider>;
};
export default FirebaseProvider;
