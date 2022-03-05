import {Lineup} from '../lineupClass';
import {fixTime} from './fixTime';
import {Column, useRowState} from 'react-table';
import {useMemo} from 'react';

const format = new Intl.NumberFormat('en-us', {signDisplay: 'always'});

export const total: Array<Column<Lineup>> = [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    width: 120,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({value}) => fixTime(value),
    width: 50,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Team',
    sortDescFirst: true,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.pointsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'DRb',
        accessor: 'dRebFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.dRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        accessor: 'oRebFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.oRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        accessor: (row) => row.totalShots.madeFor,
        id: 'madeFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        accessor: (row) => row.totalShots.attemptedFor,
        id: 'attemptedFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        accessor: 'madeTwosFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        accessor: 'attemptedTwosFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '3PM',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        accessor: 'attemptedThreesFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      // {
      //   Header: '3P%',
      //   accessor: 'threePercentFor',
      //   sortDescFirst: true,
      //   Cell: ({value}) => value.toFixed(2),
      //   Footer: (info) => {
      //     const total = useMemo(
      //       () =>
      //         info.rows.reduce(
      //           (prev, current) => prev + current.values.attemptedTwosFor,
      //           0
      //         ),
      //       [info.rows]
      //     );
      //     return <>{total}</>;
      //   },
      // },
      {
        Header: 'Pnt',
        accessor: 'paintFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.paintFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2nd',
        accessor: 'secondFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.secondFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'Ast',
        accessor: 'assistsFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.assistsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'TO',
        accessor: 'turnoversFor',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.turnoversFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
    ],
  },
  {
    Header: 'Opponent',
    sortDescFirst: true,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.pointsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'DRb',
        accessor: 'dRebAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.dRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        accessor: 'oRebAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.oRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        accessor: (row) => row.totalShots.madeAgainst,
        id: 'madeAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        accessor: (row) => row.totalShots.attemptedAgainst,
        id: 'attemptedAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        accessor: 'madeTwosAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        accessor: 'attemptedTwosAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      // {
      //   Header: '2P%',
      //   accessor: 'twoPercentAgainst',
      //   sortDescFirst: true,
      //   Cell: ({value}) => value.toFixed(2),
      //   Footer: (info) => {
      //     const total = useMemo(
      //       () =>
      //         info.rows.reduce(
      //           (prev, current) => prev + current.values.attemptedTwosFor,
      //           0
      //         ),
      //       [info.rows]
      //     );
      //     return <>{total}</>;
      //   },
      // },
      {
        Header: '3PM',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.madeThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        accessor: 'attemptedThreesAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.attemptedThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      // {
      //   Header: '3P%',
      //   accessor: 'threePercentAgainst',
      //   sortDescFirst: true,
      //   Cell: ({value}) => value.toFixed(2),
      //   Footer: (info) => {
      //     const total = useMemo(
      //       () =>
      //         info.rows.reduce(
      //           (prev, current) => prev + current.values.attemptedTwosFor,
      //           0
      //         ),
      //       [info.rows]
      //     );
      //     return <>{total}</>;
      //   },
      // },

      {
        Header: 'Pnt',
        accessor: 'paintAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.paintAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2nd',
        accessor: 'secondAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.secondAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Ast',
        accessor: 'assistsAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.assistsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'TO',
        accessor: 'turnoversAgainst',
        sortDescFirst: true,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.values.turnoversAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
    ],
  },
];

export const net: Array<Column<Lineup>> = [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    width: 140,
    disableSortBy: true,
    sortDescFirst: true,
    Footer: (info) => {
      const number = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({number} lineups)</>;
    },
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({value}) => fixTime(value),
    width: 60,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Pts',
    accessor: 'netPoints',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netPoints,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'DRb',
    accessor: 'netDRebounds',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netDRebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'ORb',
    accessor: 'netORebounds',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netORebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PM',
    accessor: 'netMadeTwos',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netMadeTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PA',
    accessor: 'netAttemptedTwos',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netAttemptedTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PM',
    accessor: 'netMadeThrees',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netMadeThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PA',
    accessor: 'netAttemptedThrees',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netAttemptedThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Pnt',
    accessor: 'netPaint',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netPaint,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2nd',
    accessor: 'netSecond',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netSecond,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Ast',
    accessor: 'netAssists',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netAssists,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'TO',
    accessor: 'netTurnovers',
    Cell: ({value}) => format.format(value),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.netTurnovers,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
];

export const advanced: Array<Column<Lineup>> = [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    width: 140,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Poss',
    accessor: 'possessions',
    disableSortBy: true,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.possessions
          ),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'O RTG',
    accessor: 'oRating',
    disableSortBy: true,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.oRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'D RTG',
    accessor: 'dRating',
    disableSortBy: true,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'eFG%',
    accessor: 'eFG',
    disableSortBy: true,
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'ORB%',
    accessor: 'oRebPercent',
    disableSortBy: true,
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'DRB%',
    accessor: 'dRebPercent',
    disableSortBy: true,
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'A/TO',
    accessor: 'assistTurnoverRatio',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'AST %',
    accessor: 'assistPerFG',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'A/P',
    accessor: 'assistsPerPoss',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: 'TO/P',
    accessor: 'turnoversPerPoss',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.dRating),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
  {
    Header: '3AR',
    accessor: 'threeAR',
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.values.threeAr),
        [info.rows]
      );
      return <>FIX</>;
    },
  },
];

export const shooting: Array<Column<Lineup>> = [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    width: 150,
    sortDescFirst: true,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
];

export const csvHeaders = [
  {label: 'players', key:'values.players'},
  {label: 'time (s)', key:'values.time'},
  {label: 'TEAM', key:''},
  {label: 'Pts', key:'values.pointsFor'},
  {label: 'Drb', key:'values.dRebFor'},
  {label: 'Orb', key:'values.oRebFor'},
  {label: 'FGM', key:'values.madeFor'},
  {label: 'FGA', key:'values.attemptedFor'},
  {label: '2-PM', key:'values.madeTwosFor'},
  {label: '2-PA', key:'values.attemptedTwosFor'},
  {label: '3-PM', key:'values.madeThreesFor'},
  {label: '3-PA', key:'values.attemptedThreesFor'},
  {label: 'Paint', key:'values.paintFor'},
  {label: '2nd Chance', key:'values.secondFor'},
  {label: 'Ast', key:'values.assistsFor'},
  {label: 'TO', key:'values.turnoversFor'},
  {label: 'Pts', key:'values.pointsAgainst'},
  {label: 'Drb', key:'values.dRebAgainst'},
  {label: 'Orb', key:'values.oRebAgainst'},
  {label: 'FGM', key:'values.madeAgainst'},
  {label: 'FGA', key:'values.attemptedAgainst'},
  {label: '2PM', key:'values.madeTwosAgainst'},
  {label: '2PA', key:'values.attemptedTwosAgainst'},
  {label: '3-PM', key:'values.madeThreesAgainst'},
  {label: '3-PA', key:'values.attemptedThreesAgainst'},
  {label: 'Paint', key:'values.paintAgainst'},
  {label: '2nd Chance', key:'values.secondAgainst'},
  {label: 'Ast', key:'values.assistsAgainst'},
  {label: 'TO', key:'values.turnoversAgainst'},
]