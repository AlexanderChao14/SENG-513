import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

class GameHeader extends React.Component{
    constructor(props){
        super();
        this.state={
            setDestination: props.setNewPage
        }
        
        this.logout = this.logout.bind(this)

    }

    logout(){
        var des="logout"
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
                        
                    </Nav>
                    <Nav>
                        <Navbar.Brand>{"Welcome "+sessionStorage.getItem("firstName")+ "             "}</Navbar.Brand>
                        <Nav.Link  name="logout"  value = "logout" onClick={this.logout}>Logout</Nav.Link>

                    </Nav>
                </Navbar>


                </>
            );
        }
}

export default GameHeader;