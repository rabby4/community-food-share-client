import { GoNumber } from "react-icons/go";
import { IoArrowUndoSharp, IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FoodDetails = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const food = useLoaderData()
    // console.log(food)
    const { _id, userName, email, foodTitle, foodImg, expDate, location, status, notes } = food;

    const date = new Date()

    const handleRequestFood = (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const donorName = form.get('donor_name');
        const donorEmail = form.get('donor_email');
        const foodTitle = form.get('food_title');
        const foodImg = form.get('food_img');
        const name = form.get('name')
        const email = form.get('email')
        const userImg = form.get('user_img')
        const location = form.get('location');
        const expDate = form.get('date');
        const reqDate = form.get('req_date');
        const price = form.get('money') || '';
        const notes = form.get('note') || '';
        const foodId = form.get('food_id')
        const newFoodRequest = { foodId, donorName, donorEmail, foodTitle, foodImg, name, email, userImg, location, expDate, reqDate, price, notes, status }
        console.log(newFoodRequest)

        axiosSecure.post('/request', newFoodRequest)
            .then(res => {
                if (res.data.acknowledged === true) {
                    toast.success('Food uploaded successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="max-w-7xl mx-auto">
            <div className='my-10 lg:px-0 md:px-10 px-5'>
                <Link to='/availableFood'>
                    <button className='flex items-center gap-2 font-medium hover:text-green-500'><IoArrowUndoSharp></IoArrowUndoSharp>Back to Available Food Page</button>
                </Link>
            </div>
            <div className="my-10">
                <div className="card lg:card-side">
                    <figure className="w-1/2">
                        <img src={foodImg} alt="Album" />
                    </figure>
                    <div className="card-body w-1/2">
                        <h2 className="card-title text-5xl font-bold">{foodTitle}</h2>
                        <div>
                            <p>{notes}</p>
                        </div>
                        <div className="flex items-center gap-3 my-5">
                            <img src={food.userImg} alt="" className="rounded-full w-12 h-12" />
                            <div>
                                <p className="font-semibold">Donator: </p>
                                <p>{food.userName}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <p className="flex items-center gap-2"> <GoNumber className="text-xl"></GoNumber> <span className="font-semibold">Quantity:</span> {food.quantity}</p>
                            <p className="flex items-center gap-2"> <IoLocationOutline className="text-xl"></IoLocationOutline> <span className="font-semibold">Location:</span> {food.location}</p>
                            <p className="flex items-center gap-2"> <IoCalendarNumberOutline className="text-xl"></IoCalendarNumberOutline> <span className="font-semibold">Expire Date:</span> {food.expDate}</p>
                        </div>
                        <div className="card-actions justify-end">
                            {/* Modal */}
                            <button className="btn bg-lime-500 px-10 text-white hover:bg-lime-600" onClick={() => document.getElementById(_id).showModal()}>Request Food</button>
                            <dialog id={_id} className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <div className='card flex-shrink-0'>
                                        <form onSubmit={handleRequestFood} className="card-body">
                                            <div className="flex gap-5 md:flex-row flex-col">
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Donor Name</span>
                                                    </label>
                                                    <input type="text" value={userName} name='donor_name' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Donor Email</span>
                                                    </label>
                                                    <input type="text" value={email} name='donor_email' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                            </div>

                                            <div className="flex gap-5 md:flex-row flex-col">
                                                <div className="form-control mb-3 w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Food Name</span>
                                                    </label>
                                                    <input type="text" value={foodTitle} name='food_title' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Food ID</span>
                                                    </label>
                                                    <input type="text" value={_id} name='food_id' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                            </div>

                                            <div className="form-control mb-3">
                                                <label className="label">
                                                    <span className="label-text font-medium">Food Image</span>
                                                </label>
                                                <input type="text" value={foodImg} name='food_img' className="input input-bordered focus-within:outline-none" readOnly />
                                            </div>

                                            <div className="flex gap-5 md:flex-row flex-col">
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Your Name</span>
                                                    </label>
                                                    <input type="text" value={user?.displayName} name='name' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Your Email</span>
                                                    </label>
                                                    <input type="text" value={user?.email} name='email' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                            </div>

                                            <div className="form-control mb-3">
                                                <label className="label">
                                                    <span className="label-text font-medium">Your Image</span>
                                                </label>
                                                <input type="text" value={user?.photoURL} name='user_img' className="input input-bordered focus-within:outline-none" readOnly />
                                            </div>

                                            <div className='flex gap-5 md:flex-row flex-col'>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Pickup Location</span>
                                                    </label>
                                                    <input type="text" value={location} name='location' className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                                <div className="form-control md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Food Expire Date</span>
                                                    </label>
                                                    <input type="date" name='date' value={expDate} className="input input-bordered" readOnly />
                                                </div>
                                            </div>

                                            <div className='flex md:flex-row flex-col gap-5'>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Request Date</span>
                                                    </label>
                                                    <input type="text" name='req_date' value={date} className="input input-bordered focus-within:outline-none" readOnly />
                                                </div>
                                                <div className="form-control mb-3 md:w-1/2">
                                                    <label className="label">
                                                        <span className="label-text font-semibold">Donation Money</span>
                                                    </label>
                                                    <input type="text" placeholder="Donate Money" name='money' className="input input-bordered focus-within:outline-none" />
                                                </div>
                                            </div>

                                            <div className="form-control mb-3 w-full">
                                                <label className="label">
                                                    <span className="label-text font-semibold">Additional Notes</span>
                                                </label>
                                                <textarea className="textarea textarea-bordered focus-within:outline-none" name='note' placeholder="Write additional notes..."></textarea>
                                            </div>

                                            <div className="flex justify-end gap-10">
                                                <div className="form-control">
                                                    <button className="btn bg-lime-500 hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-black text-white text-base px-10">Request A Food</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-action px-8 mt-0">
                                        <form method="dialog w-full">
                                            <button className="btn text-base w-full border-2 border-green-600 bg-transparent hover:bg-lime-500 hover:text-white px-20">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;