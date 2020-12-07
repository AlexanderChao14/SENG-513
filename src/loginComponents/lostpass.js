import React from "react"
import AuthLostPassword from "./authlostpass"
import "./comp.css"

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
            <div id="area">
                <h1>Lost Password</h1>
                <div id="inputarea">
                    <form role="form">
                        <div class="input">
                            <label htmlFor="email">Email:</label>
                            <input type="text" 
                            className="form-control" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                            required></input>
                        </div>
                        <button class="enter"type="submit" onClick={this.submit}>Request Password Reset</button>
                    </form>

                </div>

            </div>
        )

    }
}

export default Lost