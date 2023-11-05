import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    const location = useLocation()
    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};
PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;