import React from 'react';
import './game.css'

export default class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        val: props.val,
        col: props.col,
        row: props.row,
        onClick:props.onClick,
        mouseOnFunct:props.mouseOnFunct,
        mouseOffFunct:props.mouseOffFunct,
        clickedCoord:props.clickedCoord,
      };
    }

    static getDerivedStateFromProps(props, state) {
      return {
        val: props.val,
      };
    }
  
    render() {
      return (
        <td
          className="square"
          onClick={() =>{
            this.state.onClick();
            this.state.clickedCoord(this.state.col,this.state.row,this.state.val)
          } 
          }
        >
          {this.state.val}
        </td>
      );
    }
  }