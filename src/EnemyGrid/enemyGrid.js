import React from 'react';
import './game.css'
import Board from './Board.js'
import { Card } from 'react-bootstrap';




export default class EnemyGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableVals:props.tableVals,
            onClick:props.onClick,
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
          tableVals: props.tableVals,
          onClick: props.onClick
        };
      }

    render() {

        return (
            <Card className="text-center">
            <Card.Header>Enemies Grid</Card.Header>
            <Card.Body>
                <Board tableVals={this.state.tableVals} 
                onClick={this.state.onClick}/>
            </Card.Body>
        </Card>
        );
    }
}