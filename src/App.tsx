import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from './components/FirebaseProvider';
import './App.css';
import {Lineup} from './lineupClass';
import {seasonData, totalData} from './types';
import Header from './components/Header';
import Table from './components/Table';

interface Iprops {
  data: seasonData;
}

const App = () => {
  //state variables
  const [sortedData, setSortedData] = useState<Lineup[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('current');
  //games are order 0-32 so using -2 for season and -1 for conference totals
  const [selectedGame, setSelectedGame] = useState<number>(-2);
  const data = useContext(FirebaseContext);
  const changeYear = (year:string)=>{
    setSelectedGame(-2);
    setSelectedYear(year)
  }
  useEffect(() => {
    if (data) {
      const year = data[selectedYear];
      const unsorted = selectedGame === -2 ? year.season : selectedGame === -1 ? year.conference : year.games[selectedGame].lineups
      const sorted = unsorted.sort((a, b) => b.time - a.time);
      setSortedData(sorted);
    }
  }, [data, selectedGame, selectedYear]);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Header
        selectedYear={selectedYear}
        selectedGame = {selectedGame}
        games={data[selectedYear].games}
        years={Object.keys(data)}
        changeYear = {changeYear}
        changeGame = {setSelectedGame}
      />
      <Table data = {sortedData}/>
    </div>
  );
};

export default App;
