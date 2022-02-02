import React, {useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import Table from 'rc-table';
import {FirebaseContext} from './components/FirebaseProvider';
import './App.css';
import {Lineup} from './lineupClass';
import {columns} from './util/tableSetup';
import {seasonData, totalData} from './types';
import Header from './components/Header';

interface Iprops {
  data: seasonData;
}

const App = ({data}: Iprops) => {
  const [sortedData, setSortedData] = useState<Lineup[]>([]);
  useEffect(() => {
    const sorted = data.total.sort((a, b) => b.time - a.time);
    setSortedData(sorted);
  }, []);
  return (
    <div className="App">
      <Header games={data.games}/>
      <Table
        tableLayout='auto'
        className='lineupTable'
        columns={columns}
        data={sortedData.map((x, i) => ({...x, key: i}))}
      />
    </div>
  );
};

export default App;
