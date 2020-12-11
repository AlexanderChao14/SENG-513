import React from "react";
import "./headercss.css"

class Header extends React.Component{
    constructor(props){
        super();
        this.state={
            setDestination: props.setNewPage
        }
        
        this.goToLogin = this.goToLogin.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToLost = this.goToLost.bind(this)
    }

    goToLogin(){
        var des = "login"
        this.state.setDestination(des)
        // this.changePage(this.state.destination)
    }
    goToSignUp(){
        var des = "signup"
        this.state.setDestination(des)
        // this.changePage(this.state.destination)
    }

    goToLost(){
        var des = "lost"
        this.state.setDestination(des)
    }

    // changePage(destination){
    // }

    render(){
            return(
                <div id="head">
                    <h1>Battleship</h1>
                    <div id="tab">
                        <button name="toLogin" value ="toLogin" onClick={this.goToLogin}>Login Page</button>
                        <button name="toSignup"  value = "toSignup" onClick={this.goToSignUp}>Sign Up Page</button>
                        <button name="toSignup"  value = "toLost" onClick={this.goToLost}>Lost Your Password?</button>
                    </div>
                </div>
            );
        }
}

export default Header;