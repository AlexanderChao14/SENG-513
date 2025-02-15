import React from 'react';
import ShipDisplay from './ShipDisplay.js';
import Button from 'react-bootstrap/Button'

export default class ShipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableShips: props.availableShips,
      selectShip: props.selectShip,
      currentlyPlacing: props.currentlyPlacing,
      startQueue: props.startQueue,
      restartPlacement: props.restartPlacement,
      rotateShip: props.rotateShip,
      queueStarted: props.queueStarted,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      availableShips: props.availableShips,
      currentlyPlacing: props.currentlyPlacing,
      startQueue: props.startQueue,
      queueStarted: props.queueStarted,
    };
  }

  renderQueueButton() {
    // let onClick = this.state.startQueue;
    if(this.state.queueStarted){
      return (
        <h1>Queue started</h1>
      )
    }
    return (
      <div id="play-ready">
        <p className="player-tip">Ships are in formation.</p>
        <Button variant="success" id="Queue-button" onClick={this.state.startQueue}>
          Start Queue
      </Button>
        {this.renderRestartButton()}
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
          <Button variant="outline-primary" onClick={this.state.rotateShip}>
            Rotate Ship
        </Button>
          {this.renderRestartButton()}
        </div>
      </div>
    )
  }
  renderRestartButton() {
    return (
      <Button variant="outline-primary" onClick={this.state.restartPlacement}>
        Restart Placement
      </Button>
    )
  }

  //TODO Change renderqueuebutton to happen in game.js instead
  render() {
    return (
      <div className='shiplist'>
        {this.state.availableShips.length > 0 ? this.renderShips() : this.renderQueueButton()}
      </div>
    );
  }
}