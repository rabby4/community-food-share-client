import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTable } from 'react-table'
import { Link } from "react-router-dom";

const ManageFood = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [managedFood, setManagedFood] = useState([])
    useEffect(() => {
        axiosSecure.get(`/foods?email=${user?.email}`)
            .then(res => {
                setManagedFood(res.data)
            })
    }, [axiosSecure, user?.email])

    const data = React.useMemo(() => managedFood, [managedFood])
    const columns = React.useMemo(() => [
        {
            Header: 'Food Name',
            accessor: "foodTitle"
        },
        {
            Header: 'Quantity',
            accessor: "quantity"
        },
        {
            Header: 'Expire Date',
            accessor: "expDate"
        },
        {
            Header: 'Pickup Location',
            accessor: "location"
        },
        {
            Header: 'Update',
            Cell: () => {
                return <Link to='/update/'>Update</Link>;
            },
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })


    return (

        <div>
            <div className="max-w-7xl mx-auto my-28">
                <table {...getTableProps()}>
                    <thead className="">
                        {headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id} {...headerGroup.getFooterGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th key={column.id} {...column.getHeaderProps()} className="border-2 border-green-500 px-6 text-center">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td key={cell.id} {...cell.getCellProps()} className="border-2 border-green-500 px-6 text-center">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>

    );
};

export default ManageFood;