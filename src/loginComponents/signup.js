import React from "react"
import AuthSignup from "./authsignup"
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
            status: ""
        } 
        this.submit =  this.submit.bind(this)   
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangePasswordVerify =  this.handleChangePasswordVerify.bind(this)
        this.reciveSignupResponse = this.reciveSignupResponse.bind(this)
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
            this.reciveSignupResponse)
        console.log(newStatus)
        e.preventDefault()
    }

    reciveSignupResponse(newStatus,  message){
        this.setState({status:newStatus})
        this.state.setStatus(newStatus)
        
        alert(message)
        console.log(this.state.status)
    }

    render(){
        return(
            <div id="area">
                <h1>Signup</h1>
                <div id="inputarea">
                <form role="form">
                    <div class="input">
                        <label htmlFor="email">Email:</label>
                        <input type ="email" 
                            placeholder="Email" 
                            className="form-control" 
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            required></input>
                    </div>
                    <div class="input">
                        <label htmlFor="firstname">First Name:</label>
                        <input type ="firstname" 
                            placeholder="Firstname" 
                            className="form-control" 
                            value={this.state.firstname}
                            onChange = {this.handleChangeFirstName}
                            required></input>
                    </div>
                    <div class="input">
                        <label htmlFor="lastname">Last Name:</label>
                        <input type ="lastname" 
                            placeholder="Lastname" 
                            className="form-control" 
                            value={this.state.lastname}
                            onChange = {this.handleChangeLastName}
                            required></input>
                    </div>
                    <div class="input">
                        <label htmlFor="password">Password:</label>
                        <input type ="password" 
                            placeholder="Password" 
                            className="form-control" 
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            required></input>
                    </div>
                    <div class="input">
                        <label htmlFor="password">Verify Password:</label>
                        <input type ="password" 
                            placeholder="Verify Password" 
                            className="form-control" 
                            value={this.state.passwordverify}
                            onChange={this.handleChangePasswordVerify}
                            required></input>
                    </div>
                    <button class="enter" type="submit" onClick={this.submit}>Sign Up</button>
                </form>

                </div>
            </div>
        )
    }
}


export default Signup