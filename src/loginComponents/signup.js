import React from "react"
import AuthSignup from "./authsignup"
import {Alert } from 'react-bootstrap';
import "./comp.css"


class Signup extends React.Component{
    constructor(props){
        super();    
        this.state ={
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            passwordverify: "",
            status: "",
            message:""
        } 
        this.submit =  this.submit.bind(this)   
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangePasswordVerify =  this.handleChangePasswordVerify.bind(this)
        this.reciveSignupResponse = this.reciveSignupResponse.bind(this)
        this.reciveMess = this.reciveMess.bind(this)
    }
    
    

    handleChangeEmail(v){
        this.setState({email: v.target.value})
    }
    handleChangePassword(v){
        this.setState({password: v.target.value})
    }
    handleChangeFirstName(v){
        this.setState({firstname: v.target.value})
    }
    handleChangeLastName(v){
        this.setState({lastname: v.target.value})
    }
    handleChangePasswordVerify(v){
        this.setState({passwordverify: v.target.value})
    }

    submit(e){
        var newStatus = AuthSignup(this.state.email,
            this.state.password,
            this.state.firstname,
            this.state.lastname,
            this.state.passwordverify,
            this.reciveSignupResponse,
            this.reciveMess)
        console.log(newStatus)
        e.preventDefault()
    }

    reciveMess(mess){
        this.setState({message: mess})
        console.log("$$$$", this.state.message)
        
        
    }

    reciveSignupResponse(newStatus, mess){
        this.setState({message: mess})
        
        this.setState({status:newStatus})
        this.state.setStatus(newStatus)
        
        console.log(this.state.status)
    }

    render(){
        var colour="danger"
        if(this.state.message !== ""){
            if(this.state.message ==="A confirmation email has been sent to you by email."){
                colour ="success"
            }
        return(
            <div id="area">
                <Alert variant={colour}>
                    <p>{this.state.message}</p>
                </Alert>
                <h1 className="display-1">Signup</h1>
                <div id="inputarea">
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="email" className="h3">Email:</label>
                        <input type ="email" 
                            placeholder="Email" 
                            className="form-control mx-auto" 
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname" className="h3">First Name:</label>
                        <input type ="firstname" 
                            placeholder="Firstname" 
                            className="form-control mx-auto" 
                            value={this.state.firstname}
                            onChange = {this.handleChangeFirstName}
                            required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname" className="h3">Last Name:</label>
                        <input type ="lastname" 
                            placeholder="Lastname" 
                            className="form-control mx-auto" 
                            value={this.state.lastname}
                            onChange = {this.handleChangeLastName}
                            required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="h3">Password:</label>
                        <input type ="password" 
                            placeholder="Password" 
                            className="form-control mx-auto" 
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="h3">Verify Password:</label>
                        <input type ="password" 
                            placeholder="Verify Password" 
                            className="form-control mx-auto" 
                            value={this.state.passwordverify}
                            onChange={this.handleChangePasswordVerify}
                            required></input>
                    </div>
                    <button className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Sign Up</button>
                </form>

                </div>
            </div>
            )
        }
        else{
            return(
                <div id="area">
                    <h1 className="display-1">Signup</h1>
                    <div id="inputarea">
                    <form role="form">
                        <div className="form-group">
                            <label htmlFor="email" className="h3">Email:</label>
                            <input type ="email" 
                                placeholder="Email" 
                                className="form-control mx-auto" 
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname" className="h3">First Name:</label>
                            <input type ="firstname" 
                                placeholder="Firstname" 
                                className="form-control mx-auto" 
                                value={this.state.firstname}
                                onChange = {this.handleChangeFirstName}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname" className="h3">Last Name:</label>
                            <input type ="lastname" 
                                placeholder="Lastname" 
                                className="form-control mx-auto" 
                                value={this.state.lastname}
                                onChange = {this.handleChangeLastName}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="h3">Password:</label>
                            <input type ="password" 
                                placeholder="Password" 
                                className="form-control mx-auto" 
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="h3">Verify Password:</label>
                            <input type ="password" 
                                placeholder="Verify Password" 
                                className="form-control mx-auto" 
                                value={this.state.passwordverify}
                                onChange={this.handleChangePasswordVerify}
                                required></input>
                        </div>
                        <button className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Sign Up</button>
                    </form>
    
                    </div>
                </div>
                )
        }
    }
}


export default Signup