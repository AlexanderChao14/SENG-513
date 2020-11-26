import React from 'react';
import ShipDisplay from './ShipDisplay.js';

export default class ShipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableShips: props.availableShips,
      selectShip: props.selectShip,
      currentlyPlacing: props.currentlyPlacing,
      startQueue: props.startQueue,
      restartPlacement: props.restartPlacement,
      rotateShip:props.rotateShip,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      availableShips: props.availableShips,
      currentlyPlacing: props.currentlyPlacing,
    };
  }

  renderQueueButton() {
    return (
      <div id="play-ready">
        <p className="player-tip">Ships are in formation.</p>
        <button id="Queue-button" onClick={
          this.state.startQueue
          }>
          Start Queue
      </button>
      </div>
    )
  }

  RenderAvailableShips() {
    console.log(this.state.availableShips)
    let shipsLeft = this.state.availableShips.map((ship) => ship.name);

    return shipsLeft.map((shipName) => (
      <ShipDisplay
        selectShip={this.state.selectShip}
        key={shipName}
        isCurrentlyPlacing={this.state.currentlyPlacing && this.state.currentlyPlacing.name === shipName}
        shipName={shipName}
        availableShips={this.state.availableShips}
      />));
  }

  renderShips() {
    return (
      <div>
        <div id="ship-section">
          {this.RenderAvailableShips()}
        </div>
        <button onClick={this.state.rotateShip}>
          Rotate Ship
        </button>
      </div>
    )
  }
  renderRestartButton() {
    return (
      <button onClick={this.state.restartPlacement}>
        Restart Placement
      </button>
    )
  }

  //TODO Change renderqueuebutton to happen in game.js instead
  render() {
    return (
      <div className='shiplist'>
        {this.state.availableShips.length > 0 ? this.renderShips() : this.renderQueueButton()}
        {this.renderRestartButton()}
      </div>
    );
  }
}