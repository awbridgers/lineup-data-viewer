import { Lineup } from '../lineupClass';
import { fixTime } from './fixTime';

export const columns = [
  {
    title: "Lineup",
    dataIndex: 'players',
    key: 'players',
    render: (value:string,record:Lineup)=>record.players.replace(/-/g,'\n'),
    className: 'pre'
  },
  {
    title:'Time',
    dataIndex: 'time',
    render: (value: string, record:Lineup)=> fixTime(record.time),
    key: 'time'
  },
  {
    title: 'Pts For',
    dataIndex: 'pointsFor',
    key: 'pointsFor',
  },
  {
    title: 'Pts Agt',
    dataIndex: 'pointsAgainst',
    key:'pointsAgainst'
  },
  {
    title: 'DReb For',
    dataIndex: 'dRebFor',
    key:'dRebFor'
  },
  {
    title: 'OReb For',
    dataIndex: 'oRebFor',
    key:'oRebFor'
  },
  {
    title: 'DReb Agt',
    dataIndex: 'dRebAgainst',
    key: 'dRebAgainst'
  },
  {
    title: 'OReb Agt',
    dataIndex: 'oRebAgainst',
    key: 'oRebAgainst'
  },
  {
    title: '2PM For',  
    dataIndex: 'madeTwosFor',
    key: 'madeTwosFor'
  },
  {
    title: '2PA For',
    dataIndex: 'attemptedTwosFor',
    key:'attemptedTwosFor'
  },
  {
    title: '3PM For',
    dataIndex: 'madeThreesFor',
    key:'madeThreesFor'
  },
  {
    title: '3PA For',
    dataIndex: 'attemptedThreesFor',
    key:'attemptedThreesFor'
  },
  {
    title: '2PM Agt',  
    dataIndex: 'madeTwosAgainst',
    key: 'madeTwosAgainst'
  },
  {
    title: '2PA Agt',
    dataIndex: 'attemptedTwosAgainst',
    key:'attemptedTwosAgainst'
  },
  {
    title: '3PM Agt',
    dataIndex: 'madeThreesAgainst',
    key:'madeThreesAgainst'
  },
  {
    title: '3PA Agt',
    dataIndex: 'attemptedThreesAgainst',
    key:'attemptedThreesAgainst'
  },
  {
    title: 'Paint For',
    dataIndex: 'paintFor',
    key:'paintFor'
  },
  {
    title: 'Paint Agt',
    dataIndex: 'paintAgainst',
    key: 'paintAgainst'
  },
  {
    title: '2nd For',
    dataIndex: 'secondFor',
    key:'secondFor'
  },
  {
    title: '2nd Agt',
    dataIndex: 'secondAgainst',
    key: 'secondAgainst'
  },
  {
    title: 'Ast For',
    dataIndex: 'assistsFor',
    key:'assistsFor'
  },
  {
    title: 'Ast Agt',
    dataIndex: 'assistsAgainst',
    key:'assistsAgainst'
  },
  {
    title: 'TO For',
    dataIndex: 'turnoversFor',
    key:'turnoversFor'
  },
  {
    title: 'TO Agt',
    dataIndex: 'turnoversAgainst',
    key:'turnoversAgainst'
  },

]