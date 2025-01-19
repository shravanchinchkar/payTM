
export function InputBox({label,placeholder}){
    return(
    <div className="w-[300px] flex flex-col items-start gap-[5px]  py-[0.4rem]">
        <div className="font-bold text-orange-500">
            {label}
        </div>
        <div>
            <input type="text" placeholder={placeholder} className="border-[2px]  rounded-md outline-none px-[10px] py-[5px]  w-[300px]"/>
        </div>
    </div>
    )
}
