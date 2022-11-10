import {getDatabase, ref, get} from 'firebase/database';
import firebase from '../firebaseConfig';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {Lineup} from '../lineupClass';
import {gameData, rawData, totalData} from '../types';
import {parseData, parsePlayers} from '../util/parseGames';

interface IProvider {
  children: ReactNode;
  men: boolean;
}
export const FirebaseContext = createContext<totalData | undefined>({});

const FirebaseProvider = ({children, men}: IProvider) => {
  const [data, setData] = useState<totalData>();
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(firebase);
      const type = men ? 'men' : 'women'
      const lineupRef = ref(db, `lineupData/${type}`);
      const data = await get(lineupRef);
      let results: {[key: string]: any} = {};
      data.forEach((year) => {
        const yearKey = year.key!;
        const gameArray: gameData[] = [];
        year.forEach((game) => {
          const lineups: Lineup[] = [];
          game.child('lineups').forEach((lineup) => {
            if (lineup.key) {
              const unit = new Lineup(lineup.key);
              unit.combineLineup(lineup.val());
              lineups.push(unit);
            } else {
              throw new Error('Problem in database with lineups');
            }
          });
          gameArray.push({
            score: game.val().score,
            order: game.val().order,
            accGame: game.val().accGame,
            game: game.key!.replace(/_/g, ' '),
            stats: {
              lineups, players: parsePlayers(lineups)
            }
            
          });
        });
        results[yearKey] = {
          games: gameArray.sort((a, b) => a.order - b.order),
          season: parseData(gameArray, false),
          conference: parseData(gameArray, true),
        };
      });
      setData(results);
    };
    fetchData();
  }, []);
  return (
    <FirebaseContext.Provider value={data}>{children}</FirebaseContext.Provider>
  );
};
export default FirebaseProvider;
