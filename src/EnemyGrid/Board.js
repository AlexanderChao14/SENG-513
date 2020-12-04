import React from 'react';
import './game.css'
import Square from './Square.js'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      tableVals: props.tableVals,
      onClick:props.onClick,
    };
    this.createTable = this.createTable.bind(this);
    //this.clickedCoord = this.clickedCoord.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      tableVals: props.tableVals,
      onClick: props.onClick
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
          onClick={this.state.onClick}
          //clickedCoord={this.clickedCoord}
          hoverFunct={() => {
            //todo
          }}
        />);

      }
      //Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>)
    }

    return table
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