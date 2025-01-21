

import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../../store/atoms/isAuth";
import { Navigate } from "react-router-dom";

export function PrivateRouter({children}){
    const isAuth=useRecoilValue(isAuthenticated);
    if(isAuth===false){
        return <Navigate to={"/signin"}/>
    }
    else{
        console.log("Childreeennn")
        return children
    }
}