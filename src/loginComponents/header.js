import React from "react";

class Header extends React.Component{
    constructor(props){
        super();
        this.state={
            setDestination: props.setNewPage
        }
        
        this.goToLogin = this.goToLogin.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        // this.changePage = this.changePage.bind(this);
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

    // changePage(destination){
    // }

    render(){
            return(
                <div>
                    <h1>Battleship</h1>
                    
                    <button name="toLogin" value ="toLogin" onClick={this.goToLogin}>Login Page</button>
                    <button name="toSignup"  value = "toSignup" onClick={this.goToSignUp}>Sign Up Page</button>
                </div>
            );
        }
}

export default Header;