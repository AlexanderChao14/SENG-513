import React from "react"
import resetPassword from "./authresetpass";
import AuthResetPass from "./authresetpass"
import Header from "./header"
import {Link} from "react-router-dom"
import {Alert } from 'react-bootstrap';
import "./comp.css"

class ResetPass extends React.Component{
    constructor(props){
        super();
        this.state={
            password:"",
            verify: "",
            message:""
        }
        this.handle = this.handle.bind(this)
        this.handle2 = this.handle2.bind(this)
        this.submit = this.submit.bind(this)
        this.response = this.response.bind(this)
        this.getMess = this.getMess.bind(this)
    }

    handle(v){
        this.setState({password: v.target.value})
    }
    handle2(v){
        this.setState({verify: v.target.value})
    }

    submit(e){
        var newStatus = resetPassword(this.state.password,
            this.state.verify, this.getMess)
        console.log(newStatus)
        e.preventDefault()
    }

    getMess(mess){
        this.setState({message:mess})
    }

    response(newStatus){
        this.setState({status:newStatus})
        
        
    }

    
    // routeChange=()=>{
    //     let path =  '/'
    //     this.props.history.push(path)
    // }

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
                
                <h1 className="display-1">Reset Password</h1>
                <div id="inputarea">
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="password" className="h3">New Password</label>
                        <input type="password" 
                        className="form-control mx-auto"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.handle}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="h3">Verify New Password</label>
                        <input type="password" 
                        className="form-control mx-auto"
                        placeholder="Verify New Password"
                        value={this.state.verify}
                        onChange={this.handle2}></input>
                    </div>
                    <button  className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Submit</button>
                </form>

                </div>
                <div id="link">

                    <Link to="/">To Login</Link>
                </div>
            </div>
        )
        }else{}
        return(
            <div id="area">
               
                <h1 className="display-1">Reset Password</h1>
                <div id="inputarea">
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="password" className="h3">New Password</label>
                        <input type="password" 
                        className="form-control mx-auto"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.handle}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="h3">Verify New Password</label>
                        <input type="password" 
                        className="form-control mx-auto"
                        placeholder="Verify New Password"
                        value={this.state.verify}
                        onChange={this.handle2}></input>
                    </div>
                    <button  className="btn btn-primary btn-block mx-auto my-5" type="submit" onClick={this.submit}>Submit</button>
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