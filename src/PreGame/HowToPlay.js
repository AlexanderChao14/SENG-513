import React from 'react';

export default class HowToPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div>
                <h1>HOW TO PLAY</h1>
                <h2>Before play begins, each player secretly arranges their ships on their primary grid. Each ship occupies a number of consecutive squares on the grid, arranged either horizontally or vertically. The number of squares for each ship is determined by the type of the ship. The ships cannot overlap (i.e., only one ship can occupy any given square in the grid). The types and numbers of ships allowed are the same for each player. These may vary depending on the rules. </h2>
                <h2>After the ships have been positioned, the game proceeds in a series of rounds. In each round, each player takes a turn to target a square in the opponent's grid which is to be shot at.</h2>
                <h2>The first player to shoot down all of the opponents ships is the winner!</h2>
            </div>

        );
    }
}