import { Link } from "react-router-dom";
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
    return (
        <div>
            <div className='bg-green-800 text-white mt-24'>
                {/* <div className=' bg-orange-500 py-8'>
                    <div className='container mx-auto flex justify-between items-center text-white lg:flex-row md:flex-col flex-col lg:space-y-0 md:space-y-5 space-y-5'>
                        <div>
                            <h2 className='lg:text-xl md:text-2xl text-xl font-semibold'>Sign Up to Newsletter</h2>
                        </div>
                        <div>
                            <p className='text-sm'>Get all the latest information on Events, Sales and Offers.</p>
                            <h2 className='text-xl font-semibold'>Receive $10 coupon for first shopping.</h2>
                        </div>
                        <div>
                            <form>
                                <fieldset className="form-control w-80">
                                    <div className="relative">
                                        <input type="text" placeholder="example@gmail.com" className="input input-bordered w-full pr-16" />
                                        <button className="btn bg-gray-700 hover:bg-gray-600 border-0 text-white absolute top-0 right-0 rounded-l-none">Subscribe</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div> */}
                <div className=" grid lg:grid-cols-5 md:grid-cols-2 lg:gap-0 md:gap-10 gap-10 py-16 max-w-7xl mx-auto lg:px-0 md:px-10 px-5">
                    <div className='lg:col-span-2 lg:pr-16 md:pr-10'>
                        <img className='md:w-56 w-48' src="https://i.ibb.co/4JmD8cV/CFS-logo-white-CU-182.png" alt="" />

                        <div className='space-y-1 mt-3'>
                            <p> <strong>Address:</strong> Community Food Share 650  <br />S. Taylor Avenue
                                Louisville</p>
                            <p>United State 80027</p>

                        </div>
                    </div>
                    <div>
                        <header className="footer-title opacity-80">Services</header>
                        <div className='flex flex-col space-y-2'>
                            <a className="link link-hover hover:text-yellow-300">About Us</a>
                            <a className="link link-hover hover:text-yellow-300">Contact Us</a>
                            <a className="link link-hover hover:text-yellow-300">Support</a>
                            {/* <a className="link link-hover hover:text-yellow-300">Marketing</a>
                            <a className="link link-hover hover:text-yellow-300">Advertisement</a> */}
                        </div>
                    </div>
                    <div>
                        <header className="footer-title opacity-80">Quick Links</header>
                        <div className='flex flex-col space-y-2'>
                            <Link to='/'>
                                <button className="link link-hover hover:text-yellow-300">Home</button>
                            </Link>
                            <Link to='/hp'>
                                <button className="link link-hover hover:text-yellow-300">Add Food</button>
                            </Link>
                            <Link to='/acer'>
                                <button className="link link-hover hover:text-yellow-300">My Food Request</button>
                            </Link>
                            <Link to='/apple'>
                                <button className="link link-hover hover:text-yellow-300">Available Food</button>
                            </Link>

                        </div>

                    </div>
                    <div className='flex lg:flex-col lg:gap-0 md:gap-10 gap-10 '>
                        <div>
                            <header className="footer-title opacity-80">Contact</header>
                            <div className="flex gap-6">
                                <a href='#' className='text-2xl'><BsFacebook></BsFacebook></a>
                                <a href='#' className='text-2xl'><BsTwitter></BsTwitter></a>
                                <a href='#' className='text-2xl'><AiFillInstagram></AiFillInstagram></a>
                            </div>
                            <div className="mt-5">
                                <p><strong>Phone:</strong> (303) 652-3663</p>
                                <p><strong>Email:</strong> info@communityfood.org</p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="bg-green-900 text-white text-sm footer-center p-4">
                    <aside>
                        <p>COPYRIGHT 2023 COMMUNITY FOOD SHARE | ALL RIGHTS RESERVED</p>
                    </aside>
                </footer>
            </div>
        </div>
    );
};

export default Footer;