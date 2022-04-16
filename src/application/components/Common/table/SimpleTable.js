import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faSort
} from "@fortawesome/free-solid-svg-icons";

const SimpleTable = ({ columns, data, children }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="flex flex-row my-3 mx-1 mt-7 leading-10">
              {children}
      </div>
    <div className="overflow-x-scroll sm:rounded-none lg:rounded-2xl lg:shadow-2xl  scrollbar-thumb-gray-600 scrollbar-track-gray-700 scrollbar-thin">

      <table
        {...getTableProps()}
        className="basis-3/12 min-w-full divide-y divide-gray-600"
      >
        <thead className="bg-gray-700">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="group px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortUp} />
                      ) : (
                        <FontAwesomeIcon icon={faSortDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faSort} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody 
          {...getTableBodyProps()}
          className="bg-black divide-y divide-gray-500"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-black">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      data-column={cell.column.Header}
                      className="py-2 px-2 lg:px-6 lg:py-4 whitespace-nowrap"
                    >
                      <div className="text-sm text-gray-200 inline">
                        {cell.render("Cell")}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>

      </>
  );
};

export default SimpleTable;
