
import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export function Dashboard(){
    return (
        <div>
            <Appbar firstName={"Shravan"} initialLetter={"S"}/>
            <Balance amount={"10,000"}/>
            <Users/>
        </div>
    )
    
}