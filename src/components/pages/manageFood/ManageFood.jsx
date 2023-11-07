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
        // {
        //     Header: 'Quantity',
        //     accessor: "quantity"
        // },
        {
            Header: 'Expire Date',
            accessor: "expDate"
        },
        {
            Header: 'Pickup Location',
            accessor: "location"
        },
        {
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => (
                <div className="flex justify-center gap-4">
                    <Link to={`/update/${row.value}`} className="bg-lime-500 hover:bg-lime-600 px-7 py-2 rounded-md text-white duration-500	">Update</Link>
                    <br />
                    <Link to={`/manage/${row.value}`} className="bg-yellow-400 hover:bg-yellow-500 px-7 py-2 rounded-md text-black duration-500	">Manage</Link>
                    <button className="bg-red-500 hover:bg-red-600 px-7 py-2 rounded-md text-white duration-500	ml-4">Delete</button>
                </div>
            ),
        },
        // {
        //     Header: 'Manage',
        //     accessor: '_id',
        //     Cell: (row) => {
        //         return <Link to={`/manage/${row.value}`}>Manage</Link>;
        //     },
        //     show: false,
        // }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })


    return (

        <div>
            <div className="max-w-7xl mx-auto my-28">
                <div>
                    <h2 className="text-4xl font-bold my-14 text-center">Manage your Foods</h2>
                </div>
                <div>
                    <table {...getTableProps()} className="table table-zebra text-center">
                        <thead className="bg-green-600 text-white text-base">
                            {headerGroups.map((headerGroup) => (
                                <tr key={headerGroup.id} {...headerGroup.getFooterGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th key={column.id} {...column.getHeaderProps()} className="">
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
                                    <tr key={row.id} {...row.getRowProps()} className="font-semibold">
                                        {row.cells.map((cell) => (
                                            <td key={cell.id} {...cell.getCellProps()} className="">
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
        </div>

    );
};

export default ManageFood;