import { Lineup } from '../lineupClass';
import { fixTime } from './fixTime';

export const columns = [
  {
    title: "Lineup",
    dataIndex: 'players' 
  },
  {
    title:'Time',
    dataIndex: 'time',
    render: (value: string, record:Lineup)=> fixTime(record.time)
  },
  {
    title: 'Points For',
    dataIndex: 'pointsFor'
  },
  {
    title: 'Points Against',
    dataIndex: 'pointsAgainst'
  },
  {
    title: 'O Reb Against',
    dataIndex: 'oRebAgainst'
  }
]