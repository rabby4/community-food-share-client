import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
    const { login, googleSignIn } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email')
        const password = form.get('password')
        console.log(email, password)


        login(email, password)
            .then(result => {
                console.log(result.user)
                const toastLoadingId = toast.loading('Logging in...')
                toast.success('Logged in successful!', { id: toastLoadingId })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error);
                toast.error('You entered wrong email and password!')
            })

    }

    const googleLogin = (e) => {
        e.preventDefault()
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const toastLoadingId = toast.loading('Logging in...')
                toast.success('Successfully login with Google!', { id: toastLoadingId })
                navigate(location?.state ? location.state : '/')

            })
            .catch(error => {
                console.log(error)
                toast.error('Login failed! Try again')
            })
    }

    return (
        <div>
            <div className="max-w-7xl h-[700px] flex items-center mx-auto lg:px-0 md:px-0 px-5">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-xl mx-auto">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password' className="input input-bordered relative w-full" required />
                                <span className="cursor-pointer absolute right-3 bottom-4" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <label className="label my-2">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <button className="btn bg-green-700 hover:bg-green-600 text-white text-base">Login</button>
                        </div>
                    </form>
                    <div>
                        <p className='text-sm text-center mb-5'>New in this website? Please <Link to='/register'><strong className='text-green-600'>Register</strong></Link></p>
                    </div>
                    <div className="px-10 mb-10">
                        <button onClick={googleLogin} className='flex items-center w-full py-2 mt-3 border-2 border-gray-700 justify-center gap-2 rounded-md hover:text-green-600 hover:border-green-600 duration-300'>
                            <div>
                                <FcGoogle></FcGoogle>
                            </div>
                            <span>Login with Google</span>
                        </button>
                        <button className='flex items-center w-full py-2 mt-3 border-2 border-gray-700 justify-center gap-2 rounded-md hover:text-green-600 hover:border-green-600 duration-300'>
                            <FaGithub></FaGithub>
                            <span>Login with Github</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;