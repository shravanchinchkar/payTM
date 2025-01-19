import { ButtonWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";


export function Signup() {
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
          <InputBox label={"First Name"} placeholder={"John"} />
          <InputBox label={"Last Name"} placeholder={"Doe"} />
          <InputBox label={"Email"} placeholder={"john@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <Button buttonText={"Sign Up"}/>
        </div>

        {/* Following div consist of warning button */}
        <div className="">
            <ButtonWarning label={"Already have an account?"}  buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  );
}
