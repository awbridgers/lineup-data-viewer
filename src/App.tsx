import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import Table from 'rc-table'
import { FirebaseContext } from './components/FirebaseProvider';
import './App.css';
import { Lineup } from './lineupClass';
import { columns } from './util/tableSetup';
import { totalData } from './types';

function App() {
  const data = useContext(FirebaseContext);
  const [sortedData, setSortedData] = useState<Lineup[]>([]);
  useEffect(()=>{
    if(data){
      const sorted = data.current.total.sort((a,b)=>b.time - a.time)
      setSortedData(sorted)
    }
  },[data])
  return (
    <div className="App">
      <Table columns={columns} data = {sortedData}  />
    </div>
  );
}

export default App;
