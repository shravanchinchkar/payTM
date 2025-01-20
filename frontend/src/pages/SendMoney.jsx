import { Avatar } from "../components/Avatar";
import { Heading } from "../components/Heading";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

export function SendMoney() {
  const [searchParams]=useSearchParams();
  const [amount,setAmount]=useState(0);
  const id=searchParams.get("id");
  const name=searchParams.get("name");

  return (
    <div className="h-screen bg-blue-200 justify-center items-center flex flex-col">
      <div className="bg-white w-[450px] h-[380px] shadow-lg rounded-md p-[2rem] flex flex-col  gap-[5rem]">
        <Heading label={"Send Money"} />
        {/* Below Div */} 
        <div className="flex flex-col gap-[15px] items-start">
            {/* Upper Div */}
            <div className="flex flex-col">
                <div className="flex gap-[15px]">
                    <Avatar initialLetter={name.charAt(0).toUpperCase()}/>
                    <div className="font-bold text-2xl flex justify-center items-center">
                        {name}
                    </div>
                </div>
                <div className="font-semibold text-[15px]">
                    Amount (in Rs)
                </div>
            </div>
            <div>
                <input type="number" onChange={(e)=>{setAmount(e.target.value)}} placeholder="Enter amount" className="border-[2px] rounded-md p-[0.2rem] w-[380px] outline-none" />
            </div>
            <div>
            <button type="button" className="w-[380px] text-white bg-orange-500 hover:bg-orange-700   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={()=>{
              axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount:amount
              },{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
            }}>Initiate Transfer</button>
            </div>
        </div>
      </div>
    </div>
  );
}
