import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/BottomWarning";

export function Signin() {
  
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
          <InputBox label={"Email"} placeholder={"john@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <Button buttonText={"Sign In"} />
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
