import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageFood = () => {
    const { user, isLoading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [managedFood, setManagedFood] = useState([])
    useEffect(() => {
        axiosSecure.get(`/foods?email=${user?.email}`)
            .then(res => {
                setManagedFood(res.data)
            })
    }, [axiosSecure, user?.email])

    if (isLoading) {
        return 'loading...'
    }

    console.log(managedFood)

    return (
        <div>
            <h2 className="text-4xl">manage your food {managedFood.length}</h2>
        </div>
    );
};

export default ManageFood;