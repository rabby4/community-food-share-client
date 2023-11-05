import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
    const userUtil = useContext(AuthContext)
    return userUtil;
};

export default useAuth;