import React from 'react';
import './game.css'
import Board from './Board.js'
import ShipList from './ShipList.js'


const SHIPS = [
    {
        name: 'aircraftCarrier',
        length: 5,
        placed: null,
        label: 'A'
    },
    {
        name: 'submarine',
        length: 3,
        placed: null,
        label: 'B'
    },
    {
        name: 'destroyer',
        length: 2,
        placed: null,
        label: 'C'
    },
    {
        name: 'cruiser',
        length: 3,
        placed: null,
        label: 'D'
    },
    {
        name: 'battleship',
        length: 4,
        placed: null,
        label: 'E'
    },
];



export default class ShipSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placedShips: [],
            availableShips: SHIPS,
            currentlyPlacing: null,
            startQueue:props.startQueue,
            tableVals:[
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ]
        };
        this.selectShip=this.selectShip.bind(this);
        this.placeShip=this.placeShip.bind(this);
        this.restartPlacement=this.restartPlacement.bind(this)
        this.rotateShip=this.rotateShip.bind(this)
        this.queuePressed=this.queuePressed.bind(this)

    }

    selectShip(shipName){
        console.log(shipName)
        let shipIdx = this.state.availableShips.findIndex((ship) => ship.name === shipName);
        console.log(shipIdx)
        let shipToPlace = this.state.availableShips.find(i=>i.name===shipName)
        console.log("Ship To place")
        console.log(shipToPlace)

        this.setState({
            currentlyPlacing: [{
                ...shipToPlace,
                orientation: 'horizontal',
                position: null,
            }]
        });
        console.log("currently placing")
    }

    restartPlacement() {
        this.setState({
            placedShips: [],
            availableShips: SHIPS,
            currentlyPlacing: null,
            tableVals:[
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ]
        })
    }

    placeShip() {
        console.log(this.state.availableShips);
        this.setState({
            placedShips: [
                ...this.state.placedShips,
                {
                    ...this.state.currentlyPlacing,
                    placed: true,
                },
            ]
        });
        console.log(this.state.currentlyPlacing)
        let newshiplist = this.state.availableShips.filter((ship) => ship.name !== this.state.currentlyPlacing[0].name)
        console.log(newshiplist)

        this.setState({availableShips:newshiplist});
        this.setState({ currentlyPlacing: null });
    }

    rotateShip() {
        console.log("Rotate")
        if(this.state.currentlyPlacing !=null){
            let updatedOrientation = {...this.state.currentlyPlacing}
            updatedOrientation[0].orientation = updatedOrientation[0].orientation!=='horizontal' ? 'horizontal':'vertical';
            console.log(updatedOrientation);
            this.setState({currentlyPlacing:updatedOrientation})
        }
    }
    queuePressed(){
        this.state.startQueue(this.state.tableVals)
    }

    render() {

        return (
            <div className="game">
                <ShipList
                availableShips={this.state.availableShips}
                selectShip={this.selectShip}
                currentlyPlacing={this.state.currentlyPlacing}
                startQueue={this.queuePressed}
                restartPlacement={this.restartPlacement}
                rotateShip={this.rotateShip}
                />
                <div className="game-board">
                    <Board title="Place your Ships" 
                    currentlyPlacing={this.state.currentlyPlacing}
                    rotateShip={this.rotateShip}
                    placeShip={this.placeShip}
                    tableVals={this.state.tableVals}/>
                </div>
            </div>
        );
    }
}