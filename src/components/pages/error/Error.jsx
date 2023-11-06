import { Link, useRouteError } from 'react-router-dom';
import Lottie from "lottie-react";
import errorPage from '/public/404-page-not-found.json'

const Error = () => {
    const error = useRouteError()
    return (
        <div className="flex justify-center items-center h-screen">
            {
                error.status === 404 && <div className="text-center">
                    {/* <h2 className="text-4xl font-bold mb-4">Page Not Found</h2> */}
                    <div className='max-w-2xl'>
                        <Lottie animationData={errorPage}></Lottie>
                    </div>
                    <Link to='/'>
                        <button className="btn text-center bg-green-600 text-white hover:bg-green-500">Go Back Home</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default Error;