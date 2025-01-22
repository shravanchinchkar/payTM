import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticated } from "../store/atoms/isAuth";

export function Appbar({ firstName, initialLetter }) {
  const [displayLogout, setDisplayLogout] = useState(false);
  const [isAuth,setIsAuth]=useRecoilState(isAuthenticated);
  const navigate = useNavigate();

  function logOut(){
    console.log("In logOut button!")
    localStorage.setItem("token","");
    console.log("localStorage after logout:",localStorage.getItem("token"))
    setIsAuth(localStorage.getItem("token"))
    console.log("Value of isAuth after logout:",isAuth)
    navigate("/signin")
    setDisplayLogout(false);
  }
  useEffect(()=>{
    console.log("useEffect due to isAuth")
    setIsAuth(localStorage.getItem("token"))
  },[isAuth])


  return (
    <div className="w-screen bg-white flex justify-between p-[1rem] border-b-[2px] items-center">
      <div className="font-bold text-[30px]">Payments App</div>

      <div className="flex gap-[10px] mr-[1rem] relative">
        {/* Following is the greeting div */}
        <div className="font-semibold text-[20px] p-[0.2rem] flex justify-center items-center">
          Hello, {firstName}
        </div>

        <button
          onClick={() => {
            setDisplayLogout(true);
          }}
          className="text-[20px] text-white  w-[45px] h-[45px] flex justify-center items-center rounded-[50%] bg-orange-500 cursor-pointer"
        >
          {initialLetter}
        </button>

        {/* Following is the logout button */}
        <button
          className={
            displayLogout
              ? "w-[50px] h-[50px] flex justify-center items-center rounded-[50%] absolute top-[50px] right-0 bg-orange-400"
              : "hidden"
          }
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className=" w-[75%] h-[75%] stroke-[1.5px] stroke-current"
          >
            <path d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
