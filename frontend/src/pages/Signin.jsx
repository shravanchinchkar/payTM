import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthenticated } from "../store/atoms/isAuth";

export function Signin() {
  const [isAuth,setIsAuth]=useRecoilState(isAuthenticated);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-blue-200 justify-center items-center flex flex-col">
      <div className="bg-white w-[350px] h-[400px] rounded-md p-[1rem] flex flex-col items-center gap-[20px]">
        {/* Following div consist of heading and subheading */}
        {/* border-[2px] border-black */}
        <div className="flex flex-col gap-[10px] ">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
        </div>

        {/* Following div consist of input box and signup button */}
        <div className="flex flex-col gap-0">
          <InputBox
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"john@gmail.com"}
          />
          <InputBox
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <Button
            onClick={async () => {
              console.log("HELLO SIGNIN BUTTON!");

              //hits the backend for the signin  route

              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username: username,
                  password: password,
                }
              );

              if (response.data.token != null) {
                console.log("token from BE is:",response.data.token)//display token from BE

                localStorage.setItem("token",response.data.token); //set token to localStorage

                setIsAuth(localStorage.getItem("token")) //set the token to isAuth State

                console.log("isAuth after signin is:",isAuth)//displaying isAuth
                // alert("Signin Successful!");
                navigate("/dashboard");
              } else if (response.data.message === "Error while logging in") {
                localStorage.clear();
                alert("User dose not exists!");
                // navigate("/signin");
                setUserName("");
                setPassword("");
              } else if (response.data.message === "Incorrect inputs") {
                alert("Please Enter Correct Data");
              }
            }}
            buttonText={"Sign In"}
          />
        </div>

        {/* Following div consist of warning button */}
        <div>
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
