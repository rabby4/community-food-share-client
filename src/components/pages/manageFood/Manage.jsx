import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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
    const filteredFood = requestFood?.find(reqFood => reqFood?.foodId === food?._id)
    console.log(filteredFood)

    const handleConfirm = (id) => {
        axiosSecure.patch(`/request/${id}`, { status: 'Delivered' })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Food Uploaded Successfully!",
                        icon: "success"
                    });
                }
            })

    }



    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <h2 className="text-4xl font-bold my-14 text-center">Manage your Foods</h2>
            </div>
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
                        {
                            filteredFood ? <tr>
                                <td className=''>
                                    <div className="flex items-center space-x-1">
                                        <div className="avatar">
                                            <div className="mask mask-squircle  w-24 h-24">
                                                <img src={filteredFood?.userImg} alt="Requester images" />
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
                                    <button onClick={() => handleConfirm(filteredFood._id)} className="font-bold">{filteredFood?.status}</button>
                                </td>

                            </tr> :
                                <div>
                                    <h2 className="text-4xl font-bold my-14 text-center">Nobody requested for this food</h2>
                                </div>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manage;