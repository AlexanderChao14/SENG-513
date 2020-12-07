import React from "react"
import AuthVerify from "./authverify"
import Header from "./header"
import {Link} from "react-router-dom"
import "./othercomp.css"

class Verify extends React.Component{
    constructor(props){
        super();
        this.waiting = this.waiting.bind(this)
    }

    waiting(){
        console.log("About to start")
        var gotoVerify = AuthVerify()
        console.log("Got it")
        console.log(gotoVerify)
    }

    render(){
        return(
            <div>
                {/* <Header/> */}
                <h1>Verify</h1>
                <div> 
                {this.waiting()}
                    <p> You are verfied :D</p>
                </div>
                <div id="link">
                <Link to="/">To Login</Link>

                </div>
            </div>
        )
    }
}

export default Verify