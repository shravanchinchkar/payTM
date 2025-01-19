import { useState } from "react";
import { ButtonWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen bg-blue-200 justify-center items-center flex flex-col">
      <div className="bg-white w-[350px] h-[560px] rounded-md p-[1rem] flex flex-col items-center gap-[20px]">
        {/* Following div consist of heading and subheading */}
        {/* border-[2px] border-black */}
        <div className="flex flex-col gap-[10px] ">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
        </div>

        {/* Following div consist of input box and signup button */}
        <div className="flex flex-col gap-0">
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"john@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <Button
            onClick={async() => {
              const response =await  axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username: username,
                  password: password,
                  firstName: firstName,
                  lastName: lastName,
                }
              );
              localStorage.setItem("token",response.data.token);
            }}
            buttonText={"Sign Up"}
          />
        </div>

        {/* Following div consist of warning button */}
        <div className="">
          <ButtonWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
