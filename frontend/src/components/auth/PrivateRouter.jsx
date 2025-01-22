

import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../../store/atoms/isAuth";
import { Navigate } from "react-router-dom";

export function PrivateRouter({children}){
    console.log("PrivateRouter Mounted!")
    const isAuth=useRecoilValue(isAuthenticated);
    if(isAuth===null){
        console.log("value of isAuth in PrivateRoute:",isAuth)
        return <Navigate to={"/signin"}/>
    }
    else{
        console.log("Childreeennn")
        return children
    }
}