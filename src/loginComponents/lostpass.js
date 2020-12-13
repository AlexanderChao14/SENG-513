import React from "react"
import AuthLostPassword from "./authlostpass"
import {Alert } from 'react-bootstrap';
import "./comp.css"

class Lost extends React.Component{
    constructor(props){
        super();
        this.state={
            email:"",
            message:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.lostResponse = this.lostResponse.bind(this)
        this.resMess = this.resMess.bind(this)
    }

    handleChange(v){
        this.setState({email:v.target.value})
    }

    submit(e){
        var newStatus = AuthLostPassword(this.state.email, this.lostResponse, this.resMess)
        console.log(newStatus)
        e.preventDefault()
    }

    resMess(mess){
        this.setState({message:mess})
        console.log("####", this.state.message)
    }

    lostResponse(newStatus,mess){
        this.setState({status: newStatus})
        this.setState({message:mess})
        this.state.setStatus(newStatus)
        
    }

    render(){
        var colour="danger"
        if(this.state.message !== ""){
            if(this.state.message ==="Email sent. Please check your email to reset your password."){
                colour ="success"
            }
        return(
            <div id="area">
                <Alert variant={colour}>
                    <p>{this.state.message}</p>
                </Alert>
                <h1 className="display-1">Lost Password</h1>
                <div id="inputarea">
                    <form role="form" className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="h3">Email:</label>
                            <input type="text" 
                            className="form-control mx-auto" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                            required></input>
                        </div>
                        <button className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Request Password Reset</button>
                    </form>

                </div>

            </div>
        )

    }else{
        return(
            <div id="area">
                
                <h1 className="display-1">Lost Password</h1>
                <div id="inputarea">
                    <form role="form" className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="h3">Email:</label>
                            <input type="text" 
                            className="form-control mx-auto" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                            required></input>
                        </div>
                        <button className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Request Password Reset</button>
                    </form>

                </div>

            </div>
        )
    }
}
}

export default Lost