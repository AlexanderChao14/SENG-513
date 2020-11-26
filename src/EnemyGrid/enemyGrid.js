import React from 'react';
import './game.css'
import Board from './Board.js'





export default class EnemyGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableVals:props.tableVals,
            onClick:props.onClick,
        };
    }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board title="Enemies Grid" 
                    tableVals={this.state.tableVals}
                    onClick={this.state.onClick}/>
                </div>
            </div>
        );
    }
}