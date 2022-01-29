import {getDatabase, ref, get} from 'firebase/database';
import firebase from '../firebaseConfig';
import {createContext, ReactNode, useEffect, useState} from 'react';
import { Lineup } from '../lineupClass';
import { gameData, rawData, totalData } from '../types';
import { parseData } from '../util/parseGames';

interface IProvider  {
  children: ReactNode
}
export const FirebaseContext = createContext<totalData | undefined>({});

const FirebaseProvider = ({children}:IProvider) => {
  const [rawData, setRawData] = useState<rawData>()
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
          gameArray.push({...game.val(), game: game.key, lineups: lineups})
        })
        results[yearKey] = gameArray;
      })
      setRawData(results)
    };
    fetchData();
  }, []);
  useEffect(()=>{
    if(rawData){
      let results : totalData = {}
      for(const year in rawData){
        results[year] = {
          games: rawData[year],
          total: parseData(rawData[year], false),
          conference: parseData(rawData[year], true)
        }
      }
      setData(results);
    }
  },[rawData])
  return <FirebaseContext.Provider value={data}>{children}</FirebaseContext.Provider>;
};
export default FirebaseProvider;
