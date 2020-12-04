import React from 'react';
import './game.css'
import Board from './Board.js'





export default class PlayerGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableVals:props.tableVals
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
          tableVals: props.tableVals,
        };
      }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board title="Your Board" 
                    tableVals={this.state.tableVals}/>
                </div>
            </div>
        );
    }
}