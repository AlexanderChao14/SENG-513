import React from "react"
import Login from "./login"
import Shipselector from "./ShipSelection/ShipSelector"

export default class controller extends React.Component{
    constructor(){
        super();
        this.state = {
          status:""
        }
        this.setStatus = this.setStatus.bind(this)
    }

    setStatus(newStatus){
        this.setState({status:newStatus})
        // console.log(newStatus)
        console.log(this.state.status)
    }

    render(){
        const isLogged=this.state.status
        return(
            <div>
            {isLogged
                
                ? <Login setLoginStatus = {this.setStatus} />
                :<Shipselector />
                
            }
            </div>
        )
    }
}
