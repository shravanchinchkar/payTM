
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export function Dashboard(){
    const [loginuser,setLoginUser]=useState([])
    const [balance,setBalance]=useState(0);

    async function getData(){
       const response=await axios.get("http://localhost:3000/api/v1/user/loginuser",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log("response is:",response.data.user.firstName)
        console.log("Balance is:",response.data.balance);
        setLoginUser(response.data.user)
        setBalance(response.data.balance.balance);
    }
    useEffect(()=>{
        console.log("Dashboard Mounted")
        getData();
    },[])

    let firstName;
    let firstLetter;
    if(loginuser.firstName===undefined){
        firstName="User"
        firstLetter="U"
    }
    else{
        firstName=loginuser.firstName[0].toUpperCase() + loginuser.firstName.slice(1);
        firstLetter=loginuser.firstName[0].toUpperCase();
    }

    return (
        <div className="overflow-hidden">
            <Appbar firstName={firstName} initialLetter={firstLetter}/>
            <Balance amount={balance.toFixed(2)}/>
            <Users/>
        </div>
    )
    
}