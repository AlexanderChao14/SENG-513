import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

class PreGameHeader extends React.Component{
    constructor(props){
        super();
        this.state={
            setDestination: props.setNewPage
        }
        
        this.goToShipSelect = this.goToShipSelect.bind(this);
        this.goToRankingList = this.goToRankingList.bind(this);
        this.goToHowToPlay = this.goToHowToPlay.bind(this)
        this.logout = this.logout.bind(this)
        this.toUpdate = this.toUpdate.bind(this)
    }

    goToShipSelect(){
        var des = "ship select"
        this.state.setDestination(des)
        // this.changePage(this.state.destination)
    }
    goToRankingList(){
        var des = "rankings"
        this.state.setDestination(des)
        // this.changePage(this.state.destination)
    }

    goToHowToPlay(){
        var des = "how to play"
        this.state.setDestination(des)
    }

    logout(){
        var des="logout"
        this.state.setDestination(des)
    }
    toUpdate(){
        var des="update"
        fetch(`http://battleship.us-east-1.elasticbeanstalk.com/userInfo?email=${sessionStorage.getItem("Email")}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
            })
            .then(response => response.json())
            .then((res) => {
                console.log("Response", res);
                // console.log("#################",res.body.login)
                if(res?.statusCode ===200){
                    var lasttNameplace = res.body.lastName;
                    sessionStorage.setItem("lastName", lasttNameplace)
                } 
                else console.log(res?.body?.message);;
            })
            .catch((err) => {
                console.log("###error: ",err);
            });
        this.state.setDestination(des)
    }

    // changePage(destination){
    // }

    render(){
            return(
                <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Battleship</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link name="toShipSelect" value ="toShipSelect" onClick={this.goToShipSelect}>Ship Select</Nav.Link>
                        <Nav.Link name="toRankingList"  value = "toRankingList" onClick={this.goToRankingList}>Ranking List</Nav.Link>
                        <Nav.Link name="toUpdate"  value = "toUpdate" onClick={this.toUpdate}>Update Info</Nav.Link>
                        <Nav.Link name="toHowToPlay"  value = "toHowToPlay" onClick={this.goToHowToPlay}>How To Play</Nav.Link>
                    
                        
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

export default PreGameHeader;