import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://community-food-share-server-seven.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;