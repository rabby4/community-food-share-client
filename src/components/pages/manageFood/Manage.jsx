import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Manage = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [requestFood, setRequestFood] = useState()
    const food = useLoaderData()

    useEffect(() => {
        axiosSecure.get(`/request?email=${user?.email}`)
            .then(res => {
                setRequestFood(res.data)
            })
    }, [axiosSecure, user?.email])
    const filteredFood = requestFood?.find(reqFood => food._id === reqFood.foodId)
    console.log(filteredFood)





    return (
        <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-base text-gray-800'>Requester Image</th>
                            <th className='text-base text-gray-800'>Requester Name</th>
                            <th className='text-base text-gray-800'>Requester Email</th>
                            <th className='text-base text-gray-800'>Request Time and Date</th>
                            <th className='text-base text-gray-800'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        <tr>
                            <td className=''>
                                <div className="flex items-center space-x-1">
                                    <div className="avatar">
                                        <div className="mask mask-squircle  w-24 h-24">
                                            <img src={filteredFood?.userImg} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>

                                </div>
                            </td>
                            <td className=''>
                                <p className='font-semibold'>{filteredFood?.name}</p>

                            </td>
                            <td className=''> <strong></strong> {filteredFood?.email}</td>
                            <td className=''>
                                <p><strong></strong> {filteredFood?.reqDate}</p>
                            </td>
                            <td className=''>
                                <p><strong></strong> {filteredFood?.status}</p>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manage;