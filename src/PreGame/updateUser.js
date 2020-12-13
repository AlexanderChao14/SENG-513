import React from "react"
import { Form, Button,Container,Col, Row, Alert } from 'react-bootstrap';
import AuthUpdate from "./authUpdateuser";
import AuthUpdatepass from "./authUpdatepass";
import "./boot.css"


class UpdateUser extends React.Component{
    constructor(props){
        super()
        this.state={
            first:"",
            last:"",
            oldpass:"",
            newpass:"",
            verifypass:"",
            firstLoad: true,
            message: ""
        }
        this.handle = this.handle.bind(this)
        this.handle2 = this.handle2.bind(this)
        this.handle3 = this.handle3.bind(this)
        this.handle4 = this.handle4.bind(this)
        this.handle5 = this.handle5.bind(this)
        this.firstlaunch = this.firstlaunch.bind(this)
        this.submit = this.submit.bind(this)
        this.submit2 = this.submit2.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    getMessage(newMess){
        this.setState({message: newMess})
        console.log("$$$$", this.state.message)
    }

    handle(v){
        this.setState({first: v.target.value})
    }
    handle2(v){
        this.setState({last: v.target.value})
    }
    
    handle3(v){
        this.setState({oldpass: v.target.value})
    }
    handle4(v){
        this.setState({newpass: v.target.value})
    }
    handle5(v){
        this.setState({verifypass: v.target.value})
    }
    
    firstlaunch(){
        // console.log("I'm here")
        if(this.firstLoad){
            // console.log("I'm here2")
            this.setState({first: sessionStorage.getItem("firstName")})
            this.setState({firstLoad:false})
        }
        return(sessionStorage.getItem("firstName"))
    }

    submit(e){
        var newStatus = AuthUpdate(this.state.first, this.state.last, this.getMessage)
        
        e.preventDefault();
    }
    submit2(e){
        var newStatus = AuthUpdatepass(this.state.oldpass, this.state.newpass, this.verifypass, this.getMessage)
        
        e.preventDefault();
    }

    render(){
        var colour = "danger";
        if(this.state.message !== ""){
            if(this.state.message ==="your inforamtion has updated sucessfully"){
                colour ="success"
                sessionStorage.setItem("lastName", this.state.last);
                sessionStorage.setItem("firstName", this.state.first);
            }
        return(
            <div id="area2">
            
                <Alert variant={colour}>
                    <p>{this.state.message}</p>
                </Alert>

                <h1 className="display-1">Update User Info</h1>
                <div id="inputarea">
                    <form role="form" className="login-form">
                        <div className="form-group">
                            <label className="h4">Firstname</label>
                            <input className="form-control mx-auto" type="text" placeholder="Firstname" value ={this.state.first} onChange={this.handle}></input>
                        </div>
                    


                        <div className="form-group">
                        
                            <label className="h4">Lastname</label>
                            <input className="form-control mx-auto" type="text" placeholder="Lastname" value={this.state.last} onChange={this.handle2}></input>
                        </div>

                    
                    <Button className="btn btn-primary btn-block mx-auto" type="submit" onClick={this.submit}>Update Name</Button>

                    </form>
                </div>
                <div>
                    <h1 className="display-1">Update Password</h1>
                    <div id="inputarea">
                        <form role="form" className="login-form">
                            <div className="form-group">
                                <label className="h4">Old Password</label>
                                <input className="form-control mx-auto" type="text" placeholder="oldpassword" value ={this.state.oldpass} onChange={this.handle3}></input>
                            </div>
                        
                

                            <div className="form-group">
                            
                                <label className="h4">New Password</label>
                                <input className="form-control mx-auto" type="text" placeholder="newpassword" value={this.state.newpass} onChange={this.handle4}></input>
                            </div>

                            <div className="form-group">
                            
                                <label className="h4">Verify New Password</label>
                                <input className="form-control mx-auto" type="text" placeholder="verifypassword" value={this.state.verifypass} onChange={this.handle5}></input>
                            </div>
                    
                    
                        
                        <Button className="btn btn-primary btn-block mx-auto" type="submit" onClick={this.submit2}>Update Password</Button>
                    
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
        <div id="area2">
                <div>
                    <h1 className="display-1">Update User Info</h1>
                    <div id="inputarea">
                        <form role="form" className="login-form">
                            <div className="form-group">
                                <label className="h3">Firstname</label>
                                <input className="form-control mx-auto" type="text" placeholder="Firstname" value ={this.state.first} onChange={this.handle}></input>
                            </div>
                        
                

                            <div className="form-group">
                            
                                <label className="h3">Lastname</label>
                                <input className="form-control mx-auto" type="text" placeholder="Lastname" value={this.state.last} onChange={this.handle2}></input>
                            </div>
                    
                        
                        <Button className="btn btn-primary btn-block mx-auto" type="submit" onClick={this.submit}>Update Name</Button>
                    
                        </form>
                    </div>
                </div>
                <div>
                    <h1 className="display-1">Update Password</h1>
                    <div id="inputarea">
                        <form role="form" className="login-form">
                            <div className="form-group">
                                <label className="h4">Old Password</label>
                                <input className="form-control mx-auto" type="password" placeholder="oldpassword" value ={this.state.oldpass} onChange={this.handle3}></input>
                            </div>
                        
                

                            <div className="form-group">
                            
                                <label className="h4">New Password</label>
                                <input className="form-control mx-auto" type="password" placeholder="newpassword" value={this.state.newpass} onChange={this.handle4}></input>
                            </div>

                            <div className="form-group">
                            
                                <label className="h4">Verify New Password</label>
                                <input className="form-control mx-auto" type="password" placeholder="verifypassword" value={this.state.verifypass} onChange={this.handle5}></input>
                            </div>
                    
                    
                        
                        <Button className="btn btn-primary btn-block mx-auto" type="submit" onClick={this.submit2}>Update Password</Button>
                    
                        </form>
                    </div>
                </div>
            
        </div>
        )
    }
}
}
export default UpdateUser;