// src/components/filter.table.js
import React from "react";
import { useEffect, useState } from 'react';
import { useTable, useFilters, useGlobalFilter,usePagination , useAsyncDebounce } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDelete} from 'react-icons/md';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>

            {/* Search:{' '}
            <input style={{float:'left'}}
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            /> */}
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
               
            <table className="table table-hover" {...getTableProps()}>
                <thead style={{justifyContent:'center'}}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          
           
            <br />
            {/* <div>Showing {rows.length} results</div> */}
            <div className="pagination my-2" style={{justifyContent:'center'}}>{' '}
        <button style={{marginRight: '5px'}} type="button" class="btn btn-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}{' '}
        <button style={{marginRight: '10px'}} type="button" class="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          {/* | NEXT |{' '} */}

          <button style={{marginLeft: '10px'}} type="button" class="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button type="button" class="btn btn-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}


          {/* <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          /> */}
        </span>{' '}
        <select style={{marginLeft: '5px'}}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
            
        </div>
    )
}

function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const url = 'https://fivecube-ems-backend.herokuapp.com/attendance/attendance/';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setAttendance(json);
    } catch (error) {
    }
  };
  // delete function
  const handleDelete = id => {
    fetch('https://fivecube-ems-backend.herokuapp.com/attendance/attendance/' + id + '/', {
      method: 'DELETE',
    }).then(() => {
      setAttendance(attendance.filter(attendance => attendance.id !== id));
    });
  };

    const columns = React.useMemo(
        () => [
         
            {
                Header: 'Attendance Report',
                columns: [
                    {
                        Header: 'S.No.',
                        Cell: (row) => {
                          return <div>{Number(row.row.id) + 1}</div>;
                        },
                      },
                    {
                        Header: 'Name',
                        accessor: 'first_name'
                    },
                    {
                        Header: 'Status',
                        accessor: 'status'
                    },
                    {
                        Header: 'In Time',
                        accessor: 'in_time'
                    },
                    {
                        Header: 'Out Time',
                        accessor: 'out_time'
                    },
                    {
                      Header: 'Date',
                      accessor: 'created_at'
                  },
                  {
                    Header: 'Delete',
                    accessor: (str) => 'id',
                    Cell: (tableProps) => (
                        
                        <span 
                          onClick={() => {
                            // ES6 Syntax use the rvalue if your data is an array.
                            const dataDelete = [...attendance];
                            // It should not matter what you name tableProps. It made the most sense to me.
                            const ID = dataDelete.splice(tableProps.row.index, 1)[0]['id'];
                            console.log(ID,"gsggsgsggs")
                            // setAttendance(dataDelete);
                            handleDelete(ID)
                          }}>
                         <i style={{fontSize:'22px',color:'red',float: 'center',paddingLeft:'50px'}}><MdDelete></MdDelete></i>
                        </span>
                    
                      ),
                },
                ],
            },
        ],
        [attendance]
    )

    return (
        <Table columns={columns} data={attendance} />
    )
}

export default AttendanceReport;

