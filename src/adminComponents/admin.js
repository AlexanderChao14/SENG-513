import React, {Component } from 'react'
import AllUsers from "./allUser"
import OnlineUsers from "./onlineUser"

class Admin extends Component {




  render() {
    


      return (
        
      <div className ="contatainer">
        <AllUsers></AllUsers>
          <OnlineUsers/>



        </div>
      )
    

  }
}

export default Admin;
