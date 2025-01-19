import { Link } from "react-router-dom";

export function ButtonWarning({label,buttonText,to}){
    return (
        <div className="w-[250px] flex justify-around">
            <div className="font-medium">
                {label}
            </div>
            <Link className="font-medium underline" target="_blank" to={to}>{buttonText}</Link>
        </div>
    )

}