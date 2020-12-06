import React from "react"
import AuthVerify from "./authverify"
import Header from "./header"

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
                <Header/>
                <h1>Verify</h1>
                <div> 
                {this.waiting()}
                    <p> Your verfied :D</p>
                </div>
            </div>
        )
    }
}

export default Verify