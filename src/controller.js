import React from "react"
import Login from "./login"
import Shipselector from "./ShipSelection/ShipSelector"
import PlayerGrid from "./PlayerGrid/PlayerGrid"
import EnemyGrid from "./EnemyGrid/enemyGrid"

export default class controller extends React.Component{
    constructor(){
        super();
        this.state = {
          status:"login",
          turnStatus:null,
          playerArray:null,
          enemyArray:null,
        }
        this.loginResponse = this.loginResponse.bind(this)
        this.startQueue = this.startQueue.bind(this)
    }

    loginResponse(newStatus){
        if(newStatus===true)
        this.setState({status:"ship select"})
        // console.log(newStatus)
        console.log(this.state.status)
    }

    startQueue(playerArray) {
        console.log("Queue Started")
        console.log(playerArray)
        this.setState({status:"game"});
        this.setState({playerArray:playerArray});
        
    }

    attack(col,row){
        console.log("Attack coordinates, Col:" + col + ", Row:" + row)
        //TODO: Send to server
    }


    renderActiveComponent(){
        switch (this.state.status) {
            case "login":
                return <Login setLoginStatus = {this.loginResponse} />
            case "ship select":
                return <Shipselector  startQueue={this.startQueue}/>
            case "game":
                return( 
                    <div>
                <PlayerGrid tableVals ={this.state.playerArray}/>
                <EnemyGrid tableVals={this.state.playerArray} onClick = {this.attack}/>
                    </div>
                )
            default:
                return <Login setLoginStatus = {this.setStatus} />
        }
    }

    render(){
        //const isLogged=this.state.status
        return(
            <div>
            {this.renderActiveComponent()}
            </div>
        )
    }
}
