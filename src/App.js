import './App.css';
import React from "react"
import Auth from "./auth";

// function App() {

//   return (
//     <div id="name">
//       <form role="form" id="login-form">
//         <div>
//           <label for ="email">Email:</label>
//           <input type="text" class="form-control" id="email"></input>
//         </div>
//         <div>
//           <label for="password">Password:</label>
//           <input type="password" class="form-control" id="password"></input>
//           <button type="submit" id="login-button">Login</button>
          
//         </div>
//       </form>
//     </div>
//   );
// }


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      email:"",
      password:""
    }
  }

  handleChange(values){
    this.setState({
      email: ""
    })
  }
  

  render(){
    return (
      <div id="name">
        <h1>Battleship</h1>
        <form role="form" id="login-form">
          <div>
            <label for ="email">Email:</label>
            <input name  ="email" type="text" placeholder ="Email" class="form-control" id="email"></input>
          </div>
          <div>
            <label for="password">Password:</label>
            <input name = "pass"type="password" placeholder ="Password" class="form-control" id="password"></input>
            <button type="submit" id="login-button" onClick = "this.handleChange">Login</button>
            
          </div>
        </form>
      </div>
    );
  }
}


export default App;
