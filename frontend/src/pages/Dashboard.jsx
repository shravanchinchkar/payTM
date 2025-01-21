
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export function Dashboard(){
    const [loginuser,setLoginUser]=useState([])
    async function getData(){
       const response=await axios.get("http://localhost:3000/api/v1/user/loginuser",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log("response is:",response.data.user.firstName)
        setLoginUser(response.data.user)
    }
    useEffect(()=>{
        console.log("Dashboard Mounted")
        getData();
    },[])
    const firstName=loginuser.firstName[0].toUpperCase() +loginuser.firstName.slice(1);
    return (
        <div className="overflow-hidden">
            <Appbar firstName={firstName} initialLetter={"S"}/>
            <Balance amount={"10,000"}/>
            <Users/>
        </div>
    )
    
}