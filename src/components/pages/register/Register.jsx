import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";

const Register = () => {
    const { createUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    console.log(location)

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name')
        const email = form.get('email')
        const photo = form.get('photo')
        const password = form.get('password')
        console.log(name, email, photo, password);

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters!')
            return;
        }
        else if (!/(?=.*?[A-Z])/.test(password)) {
            toast.error('Password should be at least one Uppercase!')
            return;
        }
        else if (!/(?=.*?[0-9])/.test(password)) {
            toast.error('Password should be at least one Number!')
            return;
        }
        else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            toast.error('Password should be at least one special character!')
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        navigate(location?.state ? location.state : '/')
                    })
                toast.success('Registration Successful!')
            })
            .catch(error => {
                console.log(error)
                toast.error('Registration Failed!')
            })
    }
    return (
        <div>
            <div className="max-w-7xl h-screen flex items-center mx-auto lg:px-0 md:px-0 px-5">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-xl mx-auto">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name='name' className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name='photo' className="input input-bordered" required />
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
                            <button className="btn bg-green-700 hover:bg-green-600 text-white text-base">Register</button>
                        </div>
                    </form>
                    <div>
                        <p className='text-sm text-center mb-8'>Already have an account? Please <Link to='/login'><strong className='text-green-600'>Login</strong></Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;