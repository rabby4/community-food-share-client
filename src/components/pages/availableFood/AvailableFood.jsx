import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { IoCalendarNumberOutline, IoLocationOutline } from 'react-icons/io5';
import { GoNumber } from 'react-icons/go';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AvailableFood = () => {
    const { isLoading } = useAuth()
    const [foods, setFoods] = useState()
    const [searchItems, setSearchItems] = useState('')
    // const [filterByDate, setFilterByDate] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/foods')
            .then(res => {
                setFoods(res.data)
                // setFilterByDate(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axiosSecure])
    const filteredFoodItems = searchItems ? foods.filter(food => food.foodTitle.toLowerCase().includes(searchItems.toLowerCase())) : foods;

    if (isLoading) {
        return 'loading...'
    }

    return (
        <div>
            <Helmet>
                <title>Food Share || Available Foods</title>
            </Helmet>
            <div className="max-w-7xl mx-auto my-28">
                <div>
                    <h2 className="text-5xl font-bold my-14 text-center">Available Foods</h2>
                </div>
                <div className="flex justify-between my-14">
                    <div className="join">
                        <input className="input input-bordered join-item focus-within:outline-none" type="text" placeholder="Search Food..." id="searchBox" value={searchItems} onChange={(e) => setSearchItems(e.target.value)} />
                        <button className="btn join-item bg-lime-500 text-white px-7 hover:bg-lime-600" onClick={() => setSearchItems('')}>Clear</button>
                    </div>
                    <select className="select select-bordered w-full max-w-xs">
                        <option>All</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {
                        filteredFoodItems?.map(food => <div key={food?._id}>
                            <div className="card bg-[#f9f9f9] shadow-md">
                                <div className="flex items-center justify-center p-8">
                                    <img src={food?.foodImg} alt={food?.foodTitle} className="w-2/3" />
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {food?.foodTitle}
                                        <div className="badge bg-green-600 text-white">{food?.status}</div>
                                    </h2>
                                    <p>{food.notes.slice(0, 100)}...</p>
                                    <div className="flex items-center gap-3 my-2">
                                        <img src={food.userImg} alt="" className="rounded-full w-12 h-12" />
                                        <div>
                                            <p className="font-semibold">Donator: </p>
                                            <p>{food.userName}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2"> <GoNumber className="text-xl"></GoNumber> <span className="font-semibold">Quantity:</span> {food.quantity}</p>
                                        <p className="flex items-center gap-2"> <IoLocationOutline className="text-xl"></IoLocationOutline> <span className="font-semibold">Location:</span> {food.location}</p>
                                        <p className="flex items-center gap-2"> <IoCalendarNumberOutline className="text-xl"></IoCalendarNumberOutline> <span className="font-semibold">Expire Date:</span> {food.expDate}</p>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <Link to={`/details/${food._id}`}>
                                            <button className="btn bg-lime-500 hover:bg-lime-600 text-white px-10">Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AvailableFood;