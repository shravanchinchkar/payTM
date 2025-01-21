import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { isAuthenticated } from "./store/atoms/isAuth";

function App() {
  const[isAuth,setIsAuth]=useRecoilState(isAuthenticated);
  console.log("Value of isAuth is:",isAuth)

  async function sendToken() {
    console.log("Hello sendToken");
    const token = localStorage.getItem("token");
    console.log("localstorage token is:", token);

    const response = await axios.post("http://localhost:3000/me", {
      token: token,
    });

    if (
      response.data.message === "Token is required!" ||
      response.data.message === "Invalid or expired token" ||
      response.data.message === "Server error"
    ) {
      console.log("Backend response:", response.data.message);
      setIsAuth(false);
    } else {
      setIsAuth(response.data.isAuth);
    }
  }

  useEffect(() => {
    sendToken();
  }, [isAuth]);

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Dashboard /> : <Signin />}
            />
            <Route
              path="/signup"
              element={isAuth ? <Dashboard /> : <Signup />}
            />
            <Route
              path="/signin"
              element={isAuth ? <Dashboard /> : <Signin />}
            />
            <Route
              path="/dashboard"
              element={isAuth?<Dashboard/>:<Signin/>}
            />
            <Route path="/send" element={<SendMoney />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
