import React from 'react';
import './game.css'
import Board from './Board.js'
import { Card } from 'react-bootstrap';





export default class PlayerGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableVals: props.tableVals
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            tableVals: props.tableVals,
        };
    }

    render() {

        return (
            <Card className="text-center">
                <Card.Header>Your Board</Card.Header>
                <Card.Body>
                    <Board tableVals={this.state.tableVals} />
                </Card.Body>
            </Card>
        );
    }
}