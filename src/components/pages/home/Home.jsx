import CountUp from 'react-countup';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { GoNumber } from 'react-icons/go';
import { IoCalendarNumberOutline, IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const [foods, setFoods] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/foods')
            .then(res => {
                setFoods(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axiosSecure])

    const sortFoodByDate = (data) => {
        return data?.sort((a, b) => {
            const firstData = new Date(a.expDate)
            const secondData = new Date(b.expDate)
            return firstData - secondData
        })
    }

    const sortFoods = sortFoodByDate(foods)




    return (
        <div>
            <Helmet>
                <title>Food Share || Home</title>
            </Helmet>
            <div className="hero min-h-[700px]" style={{ backgroundImage: 'url(https://149797850.v2.pressablecdn.com/wp-content/uploads/2023/07/Feeding-Families-mother-and-daughter.png)' }}>
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="max-w-7xl">
                    <div className="text-white text-center">
                        <h1 className="mb-5 text-7xl font-bold italic">Working Together, <br />To Feed Our Neighbors</h1>
                        <p className="mb-5">Community Food Share is a food bank fighting hunger in Boulder and Broomfield Counties by providing access to fresh, <br />nutritious food through our programs and local partners. To read more about our mission and how we work to ensure <br />all of our neighbors have access to the food they need, click the link below.</p>
                        <button className="btn bg-lime-500 hover:bg-lime-600 text-white border-none px-8">Get Started</button>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto my-28'>
                <div className='my-20'>
                    <h2 className='lg:text-5xl md:text-4xl text-3xl font-bold text-center'>Featured Foods</h2>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {
                        sortFoods?.slice(0, 6).map(food => <div key={food._id}>
                            <div className="card bg-[#f9f9f9] shadow-md">
                                <div className="flex items-center justify-center p-8">
                                    <img src={food.foodImg} alt={food.foodTitle} className="w-2/3" />
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {food.foodTitle}
                                        <div className="badge bg-green-600 text-white">{food.status}</div>
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
                <div className='my-20 text-center'>
                    <Link to='/availableFood'>
                        <button className='btn bg-green-600 hover:bg-green-700 text-white'>Show All Foods</button>
                    </Link>
                </div>
            </div>
            <div className="bg-cover bg-center py-36" style={{ backgroundImage: 'url(https://cfsstaging.mystagingwebsite.com/wp-content/uploads/2023/03/map.jpg)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold">Find Food Resources Near You</h2>
                        <p className="text-xl my-3">Search our map to find free groceries and meals at a food pantry or program near you.</p>
                    </div>
                    <div className="grid grid-cols-3 justify-items-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-8 pt-10">
                                <img src="https://cfsstaging.mystagingwebsite.com/wp-content/uploads/2023/05/343A8079-4-scaled.jpg" alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body px-8 items-center text-center">
                                <h2 className="card-title text-2xl font-bold">Our Food Programs</h2>
                                <p>Our network of community-based partners and programs is here to provide free groceries, fresh produce, and nutritious meals for all.</p>
                                <div className="card-actions my-4">
                                    <button className="btn bg-lime-500 hover:bg-lime-600 text-white px-8">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-8 pt-10">
                                <img src="https://cfsstaging.mystagingwebsite.com/wp-content/uploads/2023/05/343A8171-3-scaled.jpg" alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body px-8 items-center text-center">
                                <h2 className="card-title text-2xl font-bold">Donate Food or Funds</h2>
                                <p>Help ensure anyone who needs a healthy meal is able to get one. Your donation today can make that possible.</p>
                                <div className="card-actions my-4">
                                    <button className="btn bg-lime-500 hover:bg-lime-600 text-white px-8">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-8 pt-10">
                                <img src="https://cfsstaging.mystagingwebsite.com/wp-content/uploads/2023/05/Volunteer-in-Feeding-Families-scaled.jpg" alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body px-8 items-center text-center">
                                <h2 className="card-title text-2xl font-bold">Volunteer With Us</h2>
                                <p>Lend a hand, help a neighbor. We rely on volunteers every day to help distribute food to our neighbors. With multiple ways to get involved, the perfect spot on our team awaits. </p>
                                <div className="card-actions my-4">
                                    <button className="btn bg-lime-500 hover:bg-lime-600 text-white px-8">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto py-24'>
                <div className='grid grid-cols-3 justify-items-center items-center'>
                    <div className="card w-96">
                        <figure className="px-10 pt-10">
                            <img src="https://149797850.v2.pressablecdn.com/wp-content/uploads/2023/07/shopping-bag-graphic.png" alt="Shoes" className="rounded-xl w-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-4xl">
                                <CountUp
                                    start={-875.039}
                                    end={8107090}
                                    duration={2.75}
                                    separator=","
                                    decimals={0}
                                    decimal=","
                                    onEnd={() => console.log('Ended! 👏')}
                                    onStart={() => console.log('Started! 💨')}
                                >
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />

                                        </div>
                                    )}
                                </CountUp>

                            </h2>
                            <p className='font-semibold'>Meals distributed in 2022</p>
                        </div>
                    </div>
                    <div className="card w-96">
                        <figure className="px-10 pt-10">
                            <img src="https://149797850.v2.pressablecdn.com/wp-content/uploads/2023/07/elephant-graphic.png" alt="Shoes" className="rounded-xl w-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-4xl">
                                <CountUp
                                    start={-875.039}
                                    end={8760000}
                                    duration={2.75}
                                    separator=","
                                    decimals={0}
                                    decimal=","
                                    onEnd={() => console.log('Ended! 👏')}
                                    onStart={() => console.log('Started! 💨')}
                                >
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />

                                        </div>
                                    )}
                                </CountUp>

                            </h2>
                            <p className='font-semibold'>Pounds of food rescued each year</p>
                        </div>
                    </div>
                    <div className="card w-96">
                        <figure className="px-10 pt-10">
                            <img src="https://149797850.v2.pressablecdn.com/wp-content/uploads/2023/07/coin-graphic.png" alt="Shoes" className="rounded-xl w-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-4xl">
                                <CountUp
                                    start={-875.039}
                                    end={18800000}
                                    duration={2.75}
                                    separator=","
                                    decimals={0}
                                    decimal=","
                                    prefix="$ "
                                    onEnd={() => console.log('Ended! 👏')}
                                    onStart={() => console.log('Started! 💨')}
                                >
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />

                                        </div>
                                    )}
                                </CountUp>

                            </h2>
                            <p className='font-semibold'>The value of meals distributed in 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;