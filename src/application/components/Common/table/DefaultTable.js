import React, { useState } from "react";
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
  faSort,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import GlobalFilter from "./GlobalFilter";
import { TableButton } from "./TableButton";
import { PageButton } from "./PageButton";

const DefaultTable = ({ columns, data, children, 
  setGlobalFilter,
  preGlobalFilteredRows,
  realPageSize,
  setRealPageSize,
  maxPages,
  realNextPage,
  realPreviousPage,
  realFirstPage,
  realLastPage}) => {
  const [localFilter, setLocalFilter] = useState('')
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: realPageSize },
    },
    useSortBy,
    usePagination
  );

  const handleOnClick = () => {
    setGlobalFilter(localFilter);
  };

  return (
    <>
      <div className="flex flex-row my-3 mx-1 mt-7 leading-10">
        <GlobalFilter 
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={localFilter}
                setGlobalFilter={setLocalFilter}
                handleOnClick={handleOnClick}
              />
              {children}
      </div>
    <div className="overflow-x-scroll sm:rounded-none lg:rounded-2xl lg:shadow-2xl  scrollbar-thumb-gray-600 scrollbar-track-gray-700 scrollbar-thin">

      <table
        {...getTableProps()}
        className="basis-3/12 min-w-full divide-y divide-gray-600"
      >
        <thead className="bg-gray-600">
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
          className="bg-gray-800 divide-y divide-gray-500"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-900">
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
      <div>
        <div className="py-3 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <TableButton
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </TableButton>
            <TableButton onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </TableButton>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2">
              <span className="text-sm text-white leading-9 align-middle ">
                Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{maxPages}</span>
              </span>
              <select
              className="text-gray-400 rounded-md px-3"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setRealPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <PageButton
                  className="rounded-l-md"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                  <span className="sr-only">Next</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  className="rounded-r-md"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
              </nav>
            </div>
          </div>
        </div>
      </div>

      </>
  );
};

export default DefaultTable;
