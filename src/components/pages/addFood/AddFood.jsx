import Lottie from "lottie-react";
import Donation from '../../../assets/donation.json'
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleAddFood = (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const userName = form.get('user_name');
        const email = form.get('email');
        const userImg = form.get('donar_img');
        const foodTitle = form.get('food_title');
        const foodImg = form.get('food_img');
        const quantity = form.get('quantity');
        const expDate = form.get('date');
        const location = form.get('location');
        const status = form.get('status');
        const notes = form.get('note');
        const newFood = { userName, email, userImg, foodTitle, foodImg, quantity, expDate, location, status, notes }

        axiosSecure.post('/foods', newFood)
            .then(res => {
                if (res.data.acknowledged === true) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Your Food Uploaded Successfully!",
                        icon: "success"
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <Helmet>
                <title>Food Share || Add Food</title>
            </Helmet>
            <div className='max-w-7xl mx-auto lg:px-0 md:px-10 px-5 my-32'>
                <div className='my-10'>
                    <h2 className='text-center lg:text-5xl md:text-4xl text-3xl font-bold'>Add your Food</h2>
                </div>
                <div className="flex justify-between gap-10">
                    <div className='card flex-shrink-0 shadow-xl w-1/2'>
                        <form onSubmit={handleAddFood} className="card-body">
                            <div className="flex gap-5 md:flex-row flex-col">
                                <div className="form-control mb-3 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Name</span>
                                    </label>
                                    <input type="text" value={user?.displayName} name='user_name' className="input input-bordered focus-within:outline-none" readOnly />
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
                                <input type="text" value={user?.photoURL} name='donar_img' className="input input-bordered focus-within:outline-none" readOnly />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text font-semibold">Food Name</span>
                                </label>
                                <input type="text" placeholder="Write your Food name..." name='food_title' className="input input-bordered focus-within:outline-none" required />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text font-medium">URL of Food</span>
                                </label>
                                <input type="text" placeholder="Food Photo URL..." name='food_img' className="input input-bordered focus-within:outline-none" required />
                            </div>
                            <div className='flex gap-5 md:flex-row flex-col'>
                                <div className="form-control mb-3 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Quantity</span>
                                    </label>
                                    <input type="text" placeholder="Food Quantity.." name='quantity' className="input input-bordered focus-within:outline-none" required />
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Food Expire Date</span>
                                    </label>
                                    <input type="date" name='date' className="input input-bordered" required />
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col gap-5'>
                                <div className="form-control mb-3 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Pickup Location</span>
                                    </label>
                                    <input type="text" placeholder="Location..." name='location' className="input input-bordered focus-within:outline-none" required />
                                </div>
                                <div className="form-control mb-3 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Status</span>
                                    </label>
                                    <input type="text" placeholder="Food status..." name='status' className="input input-bordered focus-within:outline-none" required />
                                </div>
                            </div>
                            <div className="form-control mb-3 w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Additional Notes</span>
                                </label>
                                <textarea className="textarea textarea-bordered focus-within:outline-none" name='note' placeholder="Write additional notes..."></textarea>
                            </div>
                            <div className="form-control">
                                <button className="btn bg-green-600 hover:bg-green-500 text-white text-base">Add Your Food</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2">
                        <Lottie animationData={Donation}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFood;