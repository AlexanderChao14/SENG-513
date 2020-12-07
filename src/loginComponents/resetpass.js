import React from "react"
import resetPassword from "./authresetpass";
import AuthResetPass from "./authresetpass"
import Header from "./header"
import {Link} from "react-router-dom"
import "./othercomp.css"

class ResetPass extends React.Component{
    constructor(props){
        super();
        this.state={
            password:"",
            verify: ""
        }
        this.handle = this.handle.bind(this)
        this.handle2 = this.handle2.bind(this)
        this.submit = this.submit.bind(this)
        this.response = this.response.bind(this)
    }

    handle(v){
        this.setState({password: v.target.value})
    }
    handle2(v){
        this.setState({verify: v.target.value})
    }

    submit(e){
        var newStatus = resetPassword(this.state.password,
            this.state.verify)
        console.log(newStatus)
        e.preventDefault()
    }

    response(newStatus, message){
        this.setState({status:newStatus})
        alert(message)
    }

    
    // routeChange=()=>{
    //     let path =  '/'
    //     this.props.history.push(path)
    // }

    render(){
        return(
            <div>
                {/* <Header/> */}
                <h1>Reset Password</h1>
                <div id="inputarea">
                <form role="form">
                    <div class="input">
                        <label htmlFor="password">New Password</label>
                        <input type="password" 
                        className="form-control"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.handle}></input>
                    </div>
                    <div class="input">
                        <label htmlFor="password">Verify New Password</label>
                        <input type="password" 
                        className="form-control"
                        placeholder="Verify New Password"
                        value={this.state.verify}
                        onChange={this.handle2}></input>
                    </div>
                    <button class="enter2"type="submit" onClick={this.submit}>Submit</button>
                </form>

                </div>
                <div id="link">

                    <Link to="/">To Login</Link>
                </div>
            </div>
        )
    }
}

export default ResetPass