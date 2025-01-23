import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sendMoneyAtom } from "../store/atoms/isAuth";

export function Users() {
  const [isSendMoney,setSendMoneyAtom]=useRecoilState(sendMoneyAtom);
  const [user,setUser]=useState([]);
  const [filter,setFilter]=useState("")
  const navigate=useNavigate();


  //need to add debouncing
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=>{
      setUser(response.data.user)
    })
  },[filter])
  
  console.log("all the users from BE:",user)

  return (
    <div className="m-[1rem] flex flex-col gap-[1rem]">
      <div className="font-bold text-xl">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          className="border-[2px] rounded-md outline-none p-[0.5rem] w-[95vw]"
          onChange={(e)=>{setFilter(e.target.value)}}
        />
      </div>

      {user.map((user)=>{
        return(<div className="flex justify-between mt-[1rem] w-[95vw]" key={user._id}>
          <div className="flex gap-[10px]">
            <Avatar initialLetter={user.firstName.charAt(0).toUpperCase()} />
            <div className="flex justify-center items-center font-bold text-xl">
              {user.firstName}
            </div>
          </div>
          <div>
            <button
            id={user._id}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={(e)=>{
                console.log("SEND MONEY USER ID:",user._id)
                setSendMoneyAtom(e.target.id);
                console.log("Send Money id:",isSendMoney)
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
              }}
            >
              Send Money
            </button>
          </div>
        </div>)
      })}
      
    </div>
  );
}
