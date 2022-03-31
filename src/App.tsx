import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from './components/FirebaseProvider';
import './App.css';
import {Lineup} from './lineupClass';
import {finderPlayer, seasonData, totalData} from './types';
import Header from './components/Header';
import Table from './components/Table';
import Finder from './components/Finder';

interface Iprops {
  data: seasonData;
}

const defaultFinder: finderPlayer[] = [
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
];

const App = () => {
  //state variables
  const [sortedData, setSortedData] = useState<Lineup[]>([]);
  const [finderData, setFinderData] = useState<Lineup[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('current');
  const [showPlayers, setShowPlayers] = useState<boolean>(false);
  //games are order 0-32 so using -2 for season and -1 for conference totals
  const [selectedGame, setSelectedGame] = useState<number>(-2);
  const [selectedStat, setSelectedStat] = useState<string>('total');
  const [showFinder, setShowFinder] = useState<boolean>(false);
  const [finderActive, setFinderActive] = useState<boolean>(false)
  const [finderPlayers, setFinderPlayers] =
    useState<finderPlayer[]>(defaultFinder);
  const data = useContext(FirebaseContext);
  const changeYear = (year: string) => {
    setSelectedGame(-2);
    setSelectedYear(year);
  };
  const cancel = () => {
    setShowFinder(false);
    setFinderPlayers(defaultFinder);
    setFinderActive(false)
  };
  const findLineups = () => {
    //split the players into omitted and included
    const include = finderPlayers.filter((x) => x.type === 'include' && x.name !== '');
    //const omit = finderPlayers.filter((x) => x.type === 'omit' && x.name!=='');
    console.log(include)
    const found = sortedData
      .filter((lineups) =>
        include.every((name) => lineups.players.includes(name.name))
      )
      //.filter((lineups) =>
       // omit.some((name) => !lineups.players.includes(name.name))
      //);
      setFinderData(found);
      setShowFinder(false)
      setFinderActive(true)
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
        games={data[selectedYear].games}
        years={Object.keys(data)}
        changeShowFinder={setShowFinder}
        changeYear={changeYear}
        changeGame={setSelectedGame}
        changeStat={setSelectedStat}
        showPlayers={showPlayers}
        changeShowPlayers={setShowPlayers}
        finderActive = {finderActive}
        changeFinderActive = {cancel}
      />
      <Table data={finderActive ? finderData : sortedData} type={selectedStat} />
      {showFinder && (
        <Finder
          year={selectedYear}
          players={finderPlayers}
          changePlayers={setFinderPlayers}
          cancel={cancel}
          submit = {findLineups}
        />
      )}
    </div>
  );
};

export default App;
