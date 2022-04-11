import {useMemo} from 'react';
import {Lineup} from '../lineupClass';
import {total, net, advanced, shooting, csvHeaders} from '../util/tableSetup';
import {Column, useTable, useSortBy, useFlexLayout} from 'react-table';
import {CSVLink} from 'react-csv';
import { TableStyle } from "../styles/table";
import {useSticky} from 'react-table-sticky'

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
    useFlexLayout,
    useSticky
  );
  return (
    <TableStyle>
      <div {...getTableProps()} className={`table sticky ${type}`}>
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="th"
                >
                  {column.id === 'players_placeholder_0' && type === 'total' ? (
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
                <div {...foot.getHeaderGroupProps()} className="tr">
                  {foot.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="td">
                      {column.render('Footer')}
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </TableStyle>
  );
};



export default Table;
