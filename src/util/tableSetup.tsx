import {Lineup} from '../lineupClass';
import {fixTime} from './fixTime';
import { ColumnGroup } from 'rc-table';
import { Column } from 'react-table';

export const columns: Array<Column<Lineup>> = [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value})=> value.replace(/-/g, '\n'),
    className: 'pre',
    width: 140
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({value})=>fixTime(value),
    defaultCanSort: true,
    width: 60

  },
  {
    Header: 'Team',
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsFor',
        

      },
      {
        Header: 'DRb',
        accessor: 'dRebFor',
        
      },
      {
        Header: 'ORb',
        accessor: 'oRebFor',
        
      },
      {
        Header: '2PM',
        accessor: 'madeTwosFor',
        
      },
      {
        Header: '2PA',
        accessor: 'attemptedTwosFor',
        
      },
      {
        Header: '3PM',
        accessor: 'madeThreesFor',
        
      },
      {
        Header: '3PA',
        accessor: 'attemptedThreesFor',
        
      },
      {
        Header: 'Pnt',
        accessor: 'paintFor',
        
      },
      {
        Header: '2nd',
        accessor: 'secondFor',
        
      },
      {
        Header: 'Ast',
        accessor: 'assistsFor',
        
      },
      {
        Header: 'TO',
        accessor: 'turnoversFor',
        
      },
    ],
  },
  {
    Header: 'Opponent',
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsAgainst',
      },

      {
        Header: 'DRb',
        accessor: 'dRebAgainst',
      },
      {
        Header: 'ORb',
        accessor: 'oRebAgainst',
      },

      {
        Header: '2PM',
        accessor: 'madeTwosAgainst',
      },
      {
        Header: '2PA',
        accessor: 'attemptedTwosAgainst',
      },
      {
        Header: '3PM',
        accessor: 'madeThreesAgainst',
      },
      {
        Header: '3PA',
        accessor: 'attemptedThreesAgainst',
      },

      {
        Header: 'Pnt',
        accessor: 'paintAgainst',
      },

      {
        Header: '2nd',
        accessor: 'secondAgainst',
      },

      {
        Header: 'Ast',
        accessor: 'assistsAgainst',
      },

      {
        Header: 'TO',
        accessor: 'turnoversAgainst',
      }
    ],
  },
];
