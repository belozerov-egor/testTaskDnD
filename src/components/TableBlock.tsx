    import {memo, useEffect, useMemo} from "react";
    import {useAppDispatch, useAppSelector} from "../hook/hook";
    import {tableThunks} from "../reducers/tableReducer";
    import {Column, useTable} from "react-table";
    import {styled} from "styled-components";

    type TableData = {
        timestep: Date;
        currentValue: number;
        prevValue: number;
        change: string;
    }
    export const TableBlock = memo(() => {
        const tableValues = useAppSelector((state) =>
            state.table.map((data) => ({
                timestep: data.timestep,
                currentValue: data.currentValue,
                prevValue: data.prevValue,
                change: `${data.change + '%'}`,
            }))
        );
        console.log(tableValues)
        const dispatch = useAppDispatch()
        const columns: Column<TableData>[] = useMemo(()=>[{
            Header: "TIME STEP",
            accessor: "timestep"
        },
            {
                Header: "CURRENT VALUE",
                accessor: "currentValue"
            },
            {
                Header: "PREVIOUS VALUE",
                accessor: "prevValue"
            },
            {
                Header: "CHANGE",
                accessor: "change"
            }], [])

        const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data: tableValues})


        useEffect(() => {
            dispatch(tableThunks.getTableValues())
        }, [])
        return (
            <Table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
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
            </Table>
        )
    });

    const Table = styled.table`
      display: block;
      tbody {
        display: block;
        overflow-y: auto;
        height: 296px;
      }
      thead,
      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
      th,
      td {
        padding: 5px;
        text-align: left;
        width: 25%;
      }
      th:first-child,
      td:first-child {
        width: 50%;
      }
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `;

