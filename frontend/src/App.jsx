
import{BrowserRouter,Route,Routes, useNavigate} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  // const navigate=useNavigate();

  async function sendToken() {
    const token= localStorage.getItem("token")
    const response=await axios.post("http://localhost:3000/me",{
      token:token
    })
    setIsAuthenticated(response.data.isAuth)
    console.log("Backend response:",response.data.isAuth) 
  }
  useEffect(()=>{
    sendToken();
  },[])

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated?<Dashboard/>:<Signin/>} />
        <Route  path="/signup" element={isAuthenticated?<Dashboard/>:<Signup/>}/>
        <Route path="/signin" element={isAuthenticated?<Dashboard/>:<Signin/>}/>
        <Route path="/dashboard" element={isAuthenticated?<Dashboard/>:<Signin/>}/>
        <Route path="/send" element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
