import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const { user, logout } = useAuth()

    const navLinks = <>
        <li><NavLink
            to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>
            Home
        </NavLink></li>
        <li><NavLink to='/addFood'>Add Food</NavLink></li>
        <li><NavLink to='/availableFood'>Available Food</NavLink></li>
    </>
    const signOut = () => {
        logout()
            .then()
            .catch()
    }

    return (
        <div className="bg-green-700">
            <div className="navbar max-w-7xl mx-auto  py-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu-md bg-black text-white for-mobile font-medium dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <img className="w-48" src="https://i.ibb.co/4JmD8cV/CFS-logo-white-CU-182.png" alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" menu-horizontal px-1 text-lg text-white">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-14 rounded-full">
                                    {
                                        user && <img className="w-14 h-14 rounded-full" src={user.photoURL} alt="" />
                                    }
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        {user?.displayName}
                                        <span className="badge">New</span>
                                    </a>
                                </li>

                                <li><button onClick={signOut} className="font-semibold" >Log Out</button></li>
                            </ul>
                        </div>
                            :
                            <Link to='/login'><button className="py-2 rounded font-semibold bg-yellow-400 hover:bg-yellow-500 text-black border-none px-8">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;