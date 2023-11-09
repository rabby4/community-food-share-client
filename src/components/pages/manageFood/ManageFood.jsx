import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTable } from 'react-table'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/foods/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainingFood = managedFood.filter(product => product._id !== id)
                            setManagedFood(remainingFood)
                            window.location.reload()
                        }
                    })
            }
        });
    }

    const data = React.useMemo(() => managedFood, [managedFood])
    const columns = React.useMemo(() => [
        {
            Header: 'Food Name',
            accessor: "foodTitle"
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
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => (
                <div className="flex justify-center gap-4">
                    <Link to={`/update/${row.value}`} className="bg-lime-500 hover:bg-lime-600 px-7 py-2 rounded-md text-white duration-500	">Update</Link>
                    <br />
                    <Link to={`/manage/${row.value}`} className="bg-yellow-400 hover:bg-yellow-500 px-7 py-2 rounded-md text-black duration-500	">Manage</Link>
                    <button onClick={() => handleDelete(row.value)} className="bg-red-500 hover:bg-red-600 px-7 py-2 rounded-md text-white duration-500 ml-4">Delete</button>
                </div>
            ),
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })


    return (

        <div>
            <Helmet>
                <title>Food Share || Manage Foods</title>
            </Helmet>
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