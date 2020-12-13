import React, {Component,useState } from 'react'
import AllUsers from "./allUsers";
import OnlineUsers from "./onlineUsers"

class App extends Component {




  render() {
    


      return (
        
      <div className ="contatainer">
        <AllUsers></AllUsers>
          <OnlineUsers/>



        </div>
      )
    

  }
}

export default App;

