import { useLoaderData } from "react-router-dom";

const Update = () => {
    const food = useLoaderData()
    console.log(food)
    return (
        <div>
            <h2>{food.foodTitle} is for update</h2>
        </div>
    );
};

export default Update;