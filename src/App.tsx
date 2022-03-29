import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from './components/FirebaseProvider';
import './App.css';
import {Lineup} from './lineupClass';
import {seasonData, totalData} from './types';
import Header from './components/Header';
import Table from './components/Table';
import Finder from './components/Finder';

interface Iprops {
  data: seasonData;
}

const App = () => {
  //state variables
  const [sortedData, setSortedData] = useState<Lineup[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('current');
  const [showPlayers, setShowPlayers] = useState<boolean>(false);
  //games are order 0-32 so using -2 for season and -1 for conference totals
  const [selectedGame, setSelectedGame] = useState<number>(-2);
  const [selectedStat, setSelectedStat] = useState<string>('total');
  const [showFinder, setShowFinder] = useState<boolean>(false);
  const [finderInclude, setFinderInclude] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]);
  const [finderOmit, setFinderOmit] = useState<string[]>([]);
  const data = useContext(FirebaseContext);
  const changeYear = (year: string) => {
    setSelectedGame(-2);
    setSelectedYear(year);
  };
  useEffect(() => {
    const playerOrTeam = showPlayers ? 'players' : 'lineups';
    if (data) {
      const year = data[selectedYear];
      const unsorted =
        selectedGame === -2
          ? year.season[playerOrTeam]
          : selectedGame === -1
          ? year.conference[playerOrTeam]
          : year.games[selectedGame].stats[playerOrTeam];
      const sorted = unsorted.sort((a, b) => b.time - a.time);
      setSortedData(sorted);
    }
  }, [data, selectedGame, selectedYear, showPlayers]);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Header
        selectedYear={selectedYear}
        selectedGame={selectedGame}
        selectedStat={selectedStat}
        showFinder={showFinder}
        games={data[selectedYear].games}
        years={Object.keys(data)}
        changeShowFinder={setShowFinder}
        changeYear={changeYear}
        changeGame={setSelectedGame}
        changeStat={setSelectedStat}
        showPlayers={showPlayers}
        changeShowPlayers={setShowPlayers}
      />
      <Table data={sortedData} type={selectedStat} />
      {showFinder && (
        <Finder year={selectedYear} includeSelected={finderInclude} />
      )}
    </div>
  );
};

export default App;
