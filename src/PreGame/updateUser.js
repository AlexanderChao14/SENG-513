import React from "react"
import { Form, Button,Container,Col, Row, Alert } from 'react-bootstrap';
import AuthUpdate from "./authUpdateuser";
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
        this.firstlaunch = this.firstlaunch.bind(this)
        this.submit = this.submit.bind(this)
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
            
        </div>
        )
    }
}
}
export default UpdateUser;