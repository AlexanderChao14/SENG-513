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
        onClick:props.onClick,
      };
    }
  
    render() {
      let displayVal = this.state.val.toString();
      let color= '#FFF';
      if (displayVal.includes("0")){
        displayVal='';
        color='#FFF'
      }
      else{
        if(displayVal.includes("1")){
          displayVal='X'
        }
        else{
          color = "#0F0"
        }
        if(this.state.val.length === 2){
          color = "#F00"
        }
      }
      return (
        <td
          className="square"
          onClick={() =>{
            this.state.onClick();
            this.state.clickedCoord(this.state.col,this.state.row,this.state.val)
          }
          }
          style={{backgroundColor:color}}
        >
          {displayVal}
        </td>
      );
    }
  }