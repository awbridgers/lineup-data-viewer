import {useMemo} from 'react';
import {Lineup} from '../lineupClass';
import {columns} from '../util/tableSetup';
import {Column, useTable, useSortBy, useFlexLayout} from 'react-table';
import {useSticky} from 'react-table-sticky';
import styled from 'styled-components';

interface iProps {
  data: Lineup[];
}

const Table = ({data}: iProps) => {
  const tableData = useMemo<Lineup[]>(() => data, [data]);

  const tableColumns = useMemo<Column<Lineup>[]>(() => columns, [columns]);
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 30, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable(
      {columns: tableColumns, data: tableData, defaultColumn},
      useSortBy,
      useFlexLayout
    );

  return (
    <Styles>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
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

      .th {
        height: 50px;
        word-wrap: break-word;
        text-align: center;
        border-right: 2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        /* font-size: 16px; */
        font-weight: bold;
        
      }
      .tr {
        border-bottom: 2px solid black;
      }
    }
    .tbody {
      /* overflow-y: scroll; */
      overflow-x: auto;
      /* height: 500px; */

      .tr {
        &:nth-child(odd) {
          background: #d3d3d3;
        }
        &:nth-child(even) {
          background: #888888;
        }
        
      }
    }

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
  }
`;

export default Table;
