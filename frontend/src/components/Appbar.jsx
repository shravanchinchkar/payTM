import { Avatar } from "./Avatar";


export function Appbar({firstName,initialLetter}){
    return (
        <div className="w-screen bg-white flex justify-between p-[1rem] border-b-[2px] items-center">
            <div className="font-bold text-[30px]">
                Payments App
            </div>
            <div className="flex gap-[10px]">
                <div className="font-semibold text-[20px] p-[0.2rem] flex justify-center items-center">
                Hello, {firstName}
                </div>
                <Avatar initialLetter={"S"}/>
            </div>
        </div>
    )
}