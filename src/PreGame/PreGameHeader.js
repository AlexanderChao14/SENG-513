import React from "react";
import "./headercss.css"

class PreGameHeader extends React.Component{
    constructor(props){
        super();
        this.state={
            setDestination: props.setNewPage
        }
        
        this.goToShipSelect = this.goToShipSelect.bind(this);
        this.goToRankingList = this.goToRankingList.bind(this);
        this.goToHowToPlay = this.goToHowToPlay.bind(this)
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

    // changePage(destination){
    // }

    render(){
            return(
                <div id="head">
                    <h1>Battleship</h1>
                    <div id="tab">
                        <button name="toShipSelect" value ="toShipSelect" onClick={this.goToShipSelect}>Ship Select</button>
                        <button name="toRankingList"  value = "toRankingList" onClick={this.goToRankingList}>Ranking List</button>
                        <button name="toHowToPlay"  value = "toHowToPlay" onClick={this.goToHowToPlay}>How To Play</button>
                    </div>
                </div>
            );
        }
}

export default PreGameHeader;