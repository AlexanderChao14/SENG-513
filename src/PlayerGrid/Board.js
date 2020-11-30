import React from 'react';
import './game.css'
import Square from './Square.js'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      tableVals: props.tableVals,
      currentlyPlacing: props.currentlyPlacing,
      rotateShip: props.rotateShip,
      placeShip: props.placeShip
    };
    this.createTable = this.createTable.bind(this);
    this.clickedCoord = this.clickedCoord.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      currentlyPlacing: props.currentlyPlacing,
      rotateShip: props.rotateShip,
      placeShip: props.placeShip,
      tableVals: props.tableVals,
    };
  }


  createTable() {
    //let tableVals = this.state.tableVals
    let table = [];
    let vals;
    if (this.state.tableVals != null) {
      vals = this.state.tableVals
    }
    else {
      vals = [
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
      ];
    }

    // Outer loop to create parent
    for (let i = 0; i < 10; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 10; j++) {

        children.push(<Square
          key={j}
          row={i}
          col={j}
          val={vals[i][j]}
          onClick={() => {
            // console.log("col: " + j + ", row: " + i +", value: " + vals[i][j]);
          }}
          clickedCoord={this.clickedCoord}
          hoverFunct={() => {

          }}
        />);

      }
      //Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>)
    }

    return table
  }

  clickedCoord(col, row, val) {
    let vals;
    if (this.state.tableVals == null) {
      vals = [
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
      ];
    }
    else {
      vals = this.state.tableVals
    }


    console.log("col: " + col + ", row: " + row + ", value: " + val)
    //Need to do some user feedback here, show if invalid coordinate
    if (this.state.currentlyPlacing != null) {
      console.log(this.state.currentlyPlacing[0])
      if (this.state.currentlyPlacing[0].orientation === 'horizontal') {
        console.log("horizontal");
        if (col + this.state.currentlyPlacing[0].length <= 10) {
          console.log("Horizontal positioning ok")
          let validPosition = true;
          let i = 0
          for (i = 0; i < this.state.currentlyPlacing[0].length; i++) {
            if (vals[row][col + i] !== 0) {
              validPosition = false;
            }
          }
          if (validPosition) {
            console.log("valid position");
            for (i = 0; i < this.state.currentlyPlacing[0].length; i++) {
              vals[row][col + i] = this.state.currentlyPlacing[0].label;
            }
            this.state.placeShip();
          }
        }
      }
      else {
        console.log("vertical")
        if (row + this.state.currentlyPlacing[0].length <= 10) {
          console.log("vertical positioning ok")
          let validPosition = true;
          let i = 0
          for (i = 0; i < this.state.currentlyPlacing[0].length; i++) {
            if (vals[row+i][col] !== 0) {
              validPosition = false;
            }
          }
          if (validPosition) {
            console.log("valid position");
            for (i = 0; i < this.state.currentlyPlacing[0].length; i++) {
              vals[row + i][col] = this.state.currentlyPlacing[0].label;
            }
            this.state.placeShip();
          }
        }
      }
    }


    this.setState({tableVals:vals});
  }
  render() {

    return (
      <div>
        <div className="Title">{this.state.title}</div>
        <table>
          <tbody>
            {this.createTable()}
          </tbody>
        </table>
      </div>
    );
  }
}