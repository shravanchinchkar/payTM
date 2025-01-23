import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { isAuthenticated, sendMoneyAtom } from "./store/atoms/isAuth";
import { PrivateRouter } from "./components/auth/PrivateRouter";

function App() {
  const [isAuth, setIsAuth] = useRecoilState(isAuthenticated);
  const sendMoneyId = useRecoilValue(sendMoneyAtom);
  console.log("Initial log of isAuth is:", isAuth);

  async function sendToken() {
    console.log("Hello getToken from localstorage");
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
      setIsAuth(null);
    } else if (response.data.isAuth) {
      console.log(
        "LocalStorage after signin response:",
        localStorage.getItem("token")
      );
      setIsAuth(localStorage.getItem("token"));
    }
  }

  useEffect(() => {
    console.log("App mounted!");
  }, []);

  useEffect(() => {
    console.log("App mounted due to isAUTH!");
    sendToken();
  }, [isAuth]);

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Dashboard /> : <Signin />} />
            <Route
              path="/signup"
              element={<Signup/>}
            />
            <Route
              path="/signin"
              element={
                <PrivateRouter>
                  <Signin />
                </PrivateRouter>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRouter>
                  <Dashboard />
                </PrivateRouter>
              }
            />
            <Route
              path="/send"
              element={
                <PrivateRouter>
                    <SendMoney/>
                </PrivateRouter>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
