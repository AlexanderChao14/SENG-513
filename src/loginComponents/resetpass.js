import React from "react"
import resetPassword from "./authresetpass";
import AuthResetPass from "./authresetpass"
import Header from "./header"

class ResetPass extends React.Component{
    constructor(props){
        super();
        this.state={
            password:"",
            verify: "",
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
        this.preventDefault({verify: v.target.value})
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

    render(){
        return(
            <div>
                <Header/>
                <h1>Reset Password</h1>
                <form role="form">
                    <div>
                        <label for="password">New Password</label>
                        <input type="password" 
                        class="form-control"
                        value={this.state.password}
                        onChange={this.handle}></input>
                    </div>
                    <div>
                        <label for="password">Verify New Password</label>
                        <input type="password" 
                        class="form-control"
                        value={this.state.verify}
                        onChange={this.handle2}></input>
                    </div>
                    <button type="submit" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default ResetPass