import { Avatar } from "../components/Avatar";
import { Heading } from "../components/Heading";

export function SendMoney() {
  return (
    <div className="h-screen bg-blue-200 justify-center items-center flex flex-col">
      <div className="bg-white w-[450px] h-[380px] shadow-lg rounded-md p-[2rem] flex flex-col  gap-[5rem]">
        <Heading label={"Send Money"} />
        {/* Below Div */} 
        <div className="flex flex-col gap-[15px] items-start">
            {/* Upper Div */}
            <div className="flex flex-col">
                <div className="flex gap-[15px]">
                    <Avatar initialLetter={"S"}/>
                    <div className="font-bold text-2xl flex justify-center items-center">
                        Friend's Name
                    </div>
                </div>
                <div className="font-semibold text-[15px]">
                    Amount (in Rs)
                </div>
            </div>
            <div>
                <input type="number" placeholder="Enter amount" className="border-[2px] rounded-md p-[0.2rem] w-[380px] outline-none" />
            </div>
            <div>
            <button type="button" className="w-[380px] text-white bg-orange-500 hover:bg-orange-700   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Initiate Transfer</button>
            </div>
        </div>
      </div>
    </div>
  );
}
