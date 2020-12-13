import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

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
                <>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand>Battleship</Navbar.Brand>
                    <Nav className="mr-auto">

                        <Nav.Link name="toLogin" value ="toLogin" onClick={this.goToLogin}>Login Page</Nav.Link>
                        <Nav.Link name="toSignup"  value = "toSignup" onClick={this.goToSignUp}>Sign Up Page</Nav.Link>
                        <Nav.Link name="toSignup"  value = "toLost" onClick={this.goToLost}>Lost Your Password?</Nav.Link>
                    </Nav>
                </Navbar>
                
                </>

                
            );
        }
}

export default Header;