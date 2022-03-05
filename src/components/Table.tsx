import {useMemo} from 'react';
import {Lineup} from '../lineupClass';
import {total, net, advanced, shooting, csvHeaders} from '../util/tableSetup';
import {Column, useTable, useSortBy, useFlexLayout} from 'react-table';
import {CSVLink} from 'react-csv';

import styled from 'styled-components';

interface iProps {
  data: Lineup[];
  type: string;
}

const Table = ({data, type}: iProps) => {
  const tableData = useMemo<Lineup[]>(() => data, [data]);

  const tableColumns = useMemo<Column<Lineup>[]>(() => {
    switch (type) {
      case 'total':
        return total;
      case 'net':
        return net;
      case 'advanced':
        return advanced;
      case 'shooting':
        return shooting;
      default:
        return total;
    }
  }, [type]);
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 30, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable(
    {columns: tableColumns, data: tableData, defaultColumn},
    useSortBy,
    useFlexLayout
  );
  return (
    <Styles>
      <div {...getTableProps()} className={`table ${type}`}>
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="th"
                >
                  {column.id === 'players_placeholder_0' ? (
                    <CSVLink headers={csvHeaders} data={rows}>Download</CSVLink>
                  ) : (
                    column.render('Header')
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="tbody">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="tfoot">
          {footerGroups.map(
            (foot, i) =>
              i === 0 && (
                <div {...foot.getFooterGroupProps()} className="tr">
                  {foot.headers.map((column) => (
                    <div {...column.getFooterProps()} className="td">
                      {column.render('Footer')}
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  display: block;
  /* overflow: auto; */
  min-width: 1000px;
  padding-bottom: 50px;

  .table {
    width: 100%;
    .thead {
      /* overflow-y: auto; */
      overflow-x: hidden;
      position: sticky;
      top: 0px;
      background: #42444e;
      color: #fff;
      .tr {
        border-bottom: 2px solid black;
      }
    }
    .tbody {
      /* overflow-y: scroll; */
      overflow-x: auto;
      /* height: 500px; */

      .tr {
        min-height: 100px;
        &:nth-child(odd) {
          background: #d3d3d3;
        }
        &:nth-child(even) {
          background: #888888;
        }
      }
    }
    .tfoot {
      .tr {
        background: #42444e;
        color: #fff;
        min-height: 100px;
      }
    }
  }
  .net,
  .advanced,
  .shooting {
    .td {
      white-space: pre;
      padding: 3px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 16px;
      font-weight: bold;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .total {
    .td {
      white-space: pre;
      padding: 3px 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 12px;
      font-weight: 600;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export default Table;
