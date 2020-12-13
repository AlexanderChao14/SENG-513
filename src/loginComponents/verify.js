import React from "react"
import AuthVerify from "./authverify"
import {Link} from "react-router-dom"
import {  Alert } from 'react-bootstrap';
import "./othercomp.css"

class Verify extends React.Component{
    constructor(props){
        super();
        this.state={
            messsage:""
        }
        this.waiting = this.waiting.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    getMessage(newMess){
        this.setState({message: newMess})
        console.log(this.state.messsage)
        //console.log("$$$$", this.state.message)
    }

    waiting(){
        console.log("About to start")
        var gotoVerify = AuthVerify(this.getMessage)
        console.log("Got it")
        console.log(gotoVerify)
    }

    render(){
        var colour = "danger";
        if(this.state.message !== ""){
            if(this.state.message ==="your inforamtion has updated sucessfully"){
                colour ="success"
            }
            return(
                <div>
                    <h1>Verify</h1>
                    
                    {this.waiting()}
                    <Alert variant={colour}>
                        <p> {this.state.messsage}</p>
                    </Alert>
                    
                    <div id="link">
                    <Link to="/">To Login</Link>

                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    
                    <h1>Verify</h1>
                    <h2>Loading...</h2>
                    <div id="link">
                    <Link to="/">To Login</Link>
    
                    </div>
                </div>
            )
        }
    }
}

export default Verify