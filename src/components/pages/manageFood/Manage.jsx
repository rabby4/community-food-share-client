import { useLoaderData } from "react-router-dom";

const Manage = () => {
    const food = useLoaderData()
    console.log(food)
    return (
        <div>
            <h2>{food.foodTitle} is ready to manage</h2>
        </div>
    );
};

export default Manage;