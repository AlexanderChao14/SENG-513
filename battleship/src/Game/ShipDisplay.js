import React from 'react';

export default class ShipDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipName: props.shipName,
            selectShip: props.selectShip,
            availableShips: props.availableShips,
            isCurrentlyPlacing: props.isCurrentlyPlacing,
        };
    }


    render() {
        let ship = this.state.availableShips.find((item) => item.name === this.state.shipName);
        return (
            <button
                id={this.state.shipName}
                onClick={() =>
                    this.state.selectShip(this.state.shipName)
                }
                key={`${this.state.shipName}`}
                className={this.state.isCurrentlyPlacing ? 'selectedShip' : 'ship'}
            >
                <div className="shipname">{this.state.shipName + " "}</div>
                <div className="shiplength">{ship.length}</div>

            </button>
        );
    }
}