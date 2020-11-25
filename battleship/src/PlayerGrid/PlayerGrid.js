import React from 'react';
import './game.css'
import Board from './Board.js'





export default class PlayerGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board title="Place your Ships" 
                    tableVals={this.state.tableVals}/>
                </div>
            </div>
        );
    }
}