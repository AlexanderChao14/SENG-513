import React from 'react';
import './game.css'
import Board from './Board.js'
import ShipList from './ShipList.js'
import { Card, CardColumns,CardDeck } from 'react-bootstrap';


const SHIPS = [
    {
        name: 'aircraftCarrier',
        length: 4,
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
        length: 3,
        placed: null,
        label: 'C'
    },
    {
        name: 'cruiser',
        length: 2,
        placed: null,
        label: 'D'
    },
    {
        name: 'battleship',
        length: 3,
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
            startQueue: props.startQueue,
            updatePlayerGrid: props.updatePlayerGrid,
            tableVals: [
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
        this.selectShip = this.selectShip.bind(this);
        this.placeShip = this.placeShip.bind(this);
        this.restartPlacement = this.restartPlacement.bind(this)
        this.rotateShip = this.rotateShip.bind(this)
        this.queuePressed = this.queuePressed.bind(this)
        this.setGrid = this.setGrid.bind(this)

    }

    static getDerivedStateFromProps(props, state) {
        return {
            startQueue: props.startQueue,
        };
    }

    selectShip(shipName) {
        console.log(shipName)
        let shipIdx = this.state.availableShips.findIndex((ship) => ship.name === shipName);
        console.log(shipIdx)
        let shipToPlace = this.state.availableShips.find(i => i.name === shipName)
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
            tableVals: [
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

        this.setState({ availableShips: newshiplist });
        this.setState({ currentlyPlacing: null });
    }

    rotateShip() {
        console.log("Rotate")
        if (this.state.currentlyPlacing != null) {
            let updatedOrientation = { ...this.state.currentlyPlacing }
            updatedOrientation[0].orientation = updatedOrientation[0].orientation !== 'horizontal' ? 'horizontal' : 'vertical';
            console.log(updatedOrientation);
            this.setState({ currentlyPlacing: updatedOrientation })
        }
    }
    queuePressed() {
        this.state.startQueue(this.state.tableVals)
    }

    setGrid() {
        this.state.updatePlayerGrid(this.state.tableVals)
    }

    render() {

        return (
            <div className="game" >
                {/* <CardDeck className="mx-auto d-flex justify-content-center" style={{columnCount: 1}}> */}

                    <Card className="text-center" style={{width:"360px"}}>
                        <Card.Header>Your Available Ships:</Card.Header>
                        <Card.Body>
                            <ShipList
                                availableShips={this.state.availableShips}
                                selectShip={this.selectShip}
                                currentlyPlacing={this.state.currentlyPlacing}
                                startQueue={this.queuePressed}
                                restartPlacement={this.restartPlacement}
                                rotateShip={this.rotateShip}
                            />
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <Card.Header>Your Board:</Card.Header>
                        <Card.Title>Place your Ships Here:</Card.Title>
                        <Card.Body>
                            <Board
                                currentlyPlacing={this.state.currentlyPlacing}
                                rotateShip={this.rotateShip}
                                placeShip={this.placeShip}
                                tableVals={this.state.tableVals}
                                updatePlayerGrid={this.setGrid} />
                        </Card.Body>
                    </Card>
                {/* </CardDeck> */}
            </div>
        );
    }
}