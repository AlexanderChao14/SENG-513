import React from "react"
import AuthLostPassword from "./authlostpass"

class Lost extends React.Component{
    constructor(props){
        super();
        this.state={
            email:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.lostResponse = this.lostResponse.bind(this)
    }

    handleChange(v){
        this.setState({email:v.target.value})
    }

    submit(e){
        var newStatus = AuthLostPassword(this.state.email, this.lostResponse)
        console.log(newStatus)
        e.preventDefault()
    }

    lostResponse(newStatus,message){
        this.setState({status: newStatus})
        this.state.setStatus(newStatus)
        alert(message)
    }

    render(){
        return(
            <div>
                <h1>Lost Password</h1>
                <form role="form">
                    <div>
                        <label for="email">Enter Email to Rest Password</label>
                        <input type="text" 
                        class="form-control" 
                        value={this.state.email}
                        onChange={this.handleChange}
                        required>Email</input>
                        <button type="submit" onClick={this.submit}>Request Password Reset</button>
                    </div>
                </form>

            </div>
        )

    }
}

export default Lost