import {Lineup} from '../lineupClass';
import {fixTime} from './fixTime';
import {Column, Row, useRowState} from 'react-table';
import {useMemo} from 'react';

interface SortProps {
  rowA: Row<Lineup>;
  rowB: Row<Lineup>;
  id: string;
  desc: boolean;
}

const format = new Intl.NumberFormat('en-us', {signDisplay: 'always'});
const sortNumbers = (
  rowA: Row<Lineup>,
  rowB: Row<Lineup>,
  id: string,
  desc?:boolean
): number => {
  const isDesc = desc ? desc : false;
  console.log(isDesc)
  const a = +rowA.values[id];
  const b = +rowB.values[id];
    //take care of dividing by 0 for percentages
    //always keep NaN's at bottom of list
    if(isNaN(a) && isNaN(b)){
      return 0
    }
    if(isNaN(a)){
      return isDesc ? -1 : 999
    }
    if(isNaN(b)){
      return isDesc ? 1 : -999
    }
  return a > b ? 1 : a < b ? -1 : 0;
};

export const total = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    sticky: 'left',
    width: isMobile ? 55 : 120,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({value}) => fixTime(value),
    width: isMobile ? 25 : 50,
    sortDescFirst: true,
    sortType: sortNumbers,
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
    sortType: sortNumbers,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsFor',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
      //   sortDescFirst: true, sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
    sortType: sortNumbers,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        accessor: 'pointsAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
      //   sortDescFirst: true, sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
      //   sortDescFirst: true, sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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

export const net = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    sticky: 'left',
    width: isMobile ? 55 : 140,
    disableSortBy: true,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const number = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({number} lineups)</>;
    },
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: ({value}) => fixTime(value),
    width: isMobile ? 20 : 60,
    sortDescFirst: true,
    sortType: sortNumbers,
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
    sortType: sortNumbers,
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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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
    sortType: sortNumbers,

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

export const advanced = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    width: isMobile ? 55 : 140,
    sticky: 'left',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Poss',
    accessor: 'possessions',
    Cell: ({value})=>Math.floor(value),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.values.possessions,
            0
          ),
        [info.rows]
      );
      return <>{Math.floor(total)}</>;
    },
  },
  {
    Header: 'O RTG',
    accessor: 'oRating',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const points = info.rows.reduce(
          (prev, current) => prev + current.original.pointsFor,
          0
        );
        return Math.round((points / poss) * 100);
      }, [info.rows]);
      return <>{total}</>;
    },
  },
  {
    Header: 'D RTG',
    accessor: 'dRating',
    sortDescFirst: false,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const points = info.rows.reduce(
          (prev, current) => prev + current.original.pointsAgainst,
          0
        );
        return Math.round((points / poss) * 100);
      }, [info.rows]);
      return <>{total}</>;
    },
  },

  {
    Header: 'ORB%',
    accessor: 'oRebPercent',
    disableSortBy: false,
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const missedShots = info.rows.reduce((prev, current) => {
          const {madeFor, attemptedFor} = current.original.totalShots;
          return prev + (attemptedFor - madeFor);
        }, 0);
        const oReb = info.rows.reduce(
          (prev, current) => prev + current.original.oRebFor,
          0
        );
        return oReb / missedShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'DRB%',
    accessor: 'dRebPercent',
    disableSortBy: false,
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const missedShots = info.rows.reduce((prev, current) => {
          const {madeAgainst, attemptedAgainst} = current.original.totalShots;
          return prev + (attemptedAgainst - madeAgainst);
        }, 0);
        const dReb = info.rows.reduce(
          (prev, current) => prev + current.original.dRebFor,
          0
        );
        return dReb / missedShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },

  {
    Header: 'AST %',
    accessor: 'assistPerFG',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const madeShots = info.rows.reduce(
          (prev, current) => prev + current.original.totalShots.madeFor,
          0
        );
        return assists / madeShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'A/P',
    accessor: 'assistsPerPoss',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        return assists / poss;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'A/TO',
    accessor: 'assistTurnoverRatio',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const turnovers = info.rows.reduce(
          (prev, current) => prev + current.original.turnoversFor,
          0
        );
        return assists / turnovers;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'TO/P',
    accessor: 'turnoversPerPoss',
    Cell: ({value}) => value.toFixed(2),
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const turnovers = info.rows.reduce(
          (prev, current) => prev + current.original.turnoversFor,
          0
        );
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        return turnovers / poss;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
];

export const shooting = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    accessor: 'players',
    Cell: ({value}) => value.replace(/-/g, '\n'),
    className: 'pre',
    disableSortBy: true,
    width: isMobile ? 55 : 150,
    sticky: 'left',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Team',
    columns: [
      {
        Header: 'FGM',
        accessor: (row) => row.totalShots.madeFor,
        id: 'madeFor',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        Header: 'FG%',
        accessor: 'fgPercentFor',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeFor,
              0
            );
            return made / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '2PM',
        accessor: 'madeTwosFor',

        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        Header: '2P%',
        accessor: 'twoPercentFor',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeTwosFor,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedTwosFor,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3PM',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
      {
        Header: '3P%',
        accessor: 'threePercentFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => value.toFixed(2),
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesFor,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesFor,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: 'eFG%',
        accessor: 'eFGFor',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const shots = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesFor,
              0
            );
            const makes = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeFor,
              0
            );
            return (makes + 0.5 * threes) / shots;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3AR',
        accessor: 'threeARFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => value.toFixed(2),
        Footer: (info) => {
          const total = useMemo(() => {
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesFor,
              0
            );
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            return threes / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
    ],
  },
  {
    Header: 'Opponent',
    columns: [
      {
        Header: 'FGM',
        accessor: (row) => row.totalShots.madeAgainst,
        id: 'madeAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
        Header: 'FG%',
        accessor: 'fgPercentAgainst',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeAgainst,
              0
            );
            return made / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '2PM',
        accessor: 'madeTwosAgainst',

        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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

      {
        Header: '2P%',
        accessor: 'twoPercentAgainst',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeTwosAgainst,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedTwosAgainst,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3PM',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
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
        sortType: sortNumbers,
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
      {
        Header: '3P%',
        accessor: 'threePercentAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => value.toFixed(2),
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesAgainst,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesAgainst,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: 'eFG%',
        accessor: 'eFGAgainst',
        Cell: ({value}) => value.toFixed(2),
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const shots = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesAgainst,
              0
            );
            const makes = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeAgainst,
              0
            );
            return (makes + 0.5 * threes) / shots;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3AR',
        accessor: 'threeARAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => value.toFixed(2),
        Footer: (info) => {
          const total = useMemo(() => {
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesAgainst,
              0
            );
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            return threes / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
    ],
  },
];

export const csvHeaders = [
  {label: 'players', key: 'values.players'},
  {label: 'time (s)', key: 'values.time'},
  {label: 'TEAM', key: ''},
  {label: 'Pts', key: 'values.pointsFor'},
  {label: 'Drb', key: 'values.dRebFor'},
  {label: 'Orb', key: 'values.oRebFor'},
  {label: 'FGM', key: 'values.madeFor'},
  {label: 'FGA', key: 'values.attemptedFor'},
  {label: '2-PM', key: 'values.madeTwosFor'},
  {label: '2-PA', key: 'values.attemptedTwosFor'},
  {label: '3-PM', key: 'values.madeThreesFor'},
  {label: '3-PA', key: 'values.attemptedThreesFor'},
  {label: 'Paint', key: 'values.paintFor'},
  {label: '2nd Chance', key: 'values.secondFor'},
  {label: 'Ast', key: 'values.assistsFor'},
  {label: 'TO', key: 'values.turnoversFor'},
  {label: 'Pts', key: 'values.pointsAgainst'},
  {label: 'Drb', key: 'values.dRebAgainst'},
  {label: 'Orb', key: 'values.oRebAgainst'},
  {label: 'FGM', key: 'values.madeAgainst'},
  {label: 'FGA', key: 'values.attemptedAgainst'},
  {label: '2PM', key: 'values.madeTwosAgainst'},
  {label: '2PA', key: 'values.attemptedTwosAgainst'},
  {label: '3-PM', key: 'values.madeThreesAgainst'},
  {label: '3-PA', key: 'values.attemptedThreesAgainst'},
  {label: 'Paint', key: 'values.paintAgainst'},
  {label: '2nd Chance', key: 'values.secondAgainst'},
  {label: 'Ast', key: 'values.assistsAgainst'},
  {label: 'TO', key: 'values.turnoversAgainst'},
];
