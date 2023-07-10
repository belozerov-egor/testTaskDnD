import {memo, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../common/hook/hook.ts";
import {tableThunks} from "./tableReducer.ts";
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
            Header: "ВРЕМЯ ",
            accessor: "timestep"
        },
            {
                Header: "ТЕКУЩЕЕ ЗНАЧЕНИЕ",
                accessor: "currentValue"
            },
            {
                Header: "ПРЕДЫДУЩИЕ ЗНАЧЕНИЕ",
                accessor: "prevValue"
            },
            {
                Header: "ИЗМЕНЕНИЕ",
                accessor: "change"
            }], [])

        const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data: tableValues})


        useEffect(() => {
            dispatch(tableThunks.getTableValues())
            const interval = setInterval(() => {
                dispatch(tableThunks.getTableValues());
            }, 60000);

            return () => {
                clearInterval(interval);
            };
        }, []);
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
      width: 600px;
      @media screen and (max-width: 840px) {
        width: 400px;
        font-size: 16px;
      }

      tbody {
        display: block;
        overflow-y: auto;
        height: 400px;
        background-color: white;
        @media screen and (max-width: 840px) {
          height: 200px;
        }
      }
    

    thead {
      background: #005fb8;
      color: white;
      @media screen and (max-width: 840px) {
        font-size: 10px;
      }
    }

    thead,
    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
      @media screen and (max-width: 840px) {
        font-size: 10px;
      }
    }

    th,
    td {
      padding: 5px;
      text-align: center;
      width: 40%;


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

