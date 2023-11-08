import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const FoodRequest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [foodRequest, setFoodRequest] = useState()
    useEffect(() => {
        axiosSecure.get('/request')
            .then(res => {
                setFoodRequest(res.data)
            })
    }, [axiosSecure])

    const myFood = foodRequest?.filter(food => food?.email === user?.email)
    // console.log(myFood)

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the food request",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`http://localhost:5000/request/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your requested food has been deleted.",
                                icon: "success"
                            });
                            const remainingFood = foodRequest.filter(product => product._id !== id)
                            setFoodRequest(remainingFood)
                        }
                    })
            }
        });



    }


    return (
        <div className="max-w-7xl mx-auto my-28">
            <div>
                <h2 className="text-4xl font-bold my-14 text-center">Manage your Requested Foods</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-base text-gray-800'>Donor Name</th>
                            <th className='text-base text-gray-800'>Food Name</th>
                            <th className='text-base text-gray-800'>Pickup Location</th>
                            <th className='text-base text-gray-800'>Expire Date</th>
                            <th className='text-base text-gray-800'>Request Date and Time</th>
                            <th className='text-base text-gray-800'>Donation Amount</th>
                            <th className='text-base text-gray-800'>Status</th>
                            <th className='text-base text-gray-800'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            myFood?.map(food => <tr key={food._id}>

                                <td className=''>
                                    <p className='font-semibold'>{food.donorName}</p>
                                </td>
                                <td className=''>
                                    <p className='font-semibold'>{food.foodTitle}</p>
                                </td>
                                <td className=''>
                                    <p className="text-base">{food.location}</p>
                                </td>
                                <td className=''>
                                    <p className="text-base">{food.expDate}</p>
                                </td>
                                <td className=''>
                                    <p className="text-base">{food.reqDate}</p>
                                </td>
                                <td className=''>
                                    <p className="text-base"><strong>$</strong> {food.price}</p>
                                </td>
                                <td className=''>
                                    <p className="text-base">{food.status}</p>
                                </td>
                                <td className=''>
                                    <button onClick={() => handleCancel(food._id)} className="bg-red-500 hover:bg-red-600 px-7 py-2 rounded-md text-white duration-500">Cancel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FoodRequest;