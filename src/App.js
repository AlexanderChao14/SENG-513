import './App.css';
import React from "react"
import Auth from "./loginComponents/auth";



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      email:"",
      password:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.submit = this.submit.bind(this);
  }


  handleChange(values){
    this.setState({email: values.target.value})
  }
  handleChange2(values){
    this.setState({password: values.target.value})
  }
  
  submit(e){
    // if(this.state.email ==null || this.state.email ==''){
    //   console.log("please enter email")
    // }else if (this.state.password == null || this.state.password ==''){
    //   console.log("enter password")
    // }else{
      Auth(this.state.email, this.state.password);
      e.preventDefault();
    // }
  }

  render(){
    return (
      <div id="name">
        <h1>Battleship</h1>
        <form role="form" id="login-form">
          <div>
            <label for ="email">Email:</label>
            <input name ="email" 
            type="email" 
            placeholder ="Email" 
            class="form-control" 
            id="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required></input>
          </div>
          <div>
            <label for="password">Password:</label>
            <input name = "password"
            type="password" 
            placeholder ="Password" 
            class="form-control" 
            id="password"
            value={this.state.password}
            onChange={this.handleChange2}
            required></input>

            <button type="submit" 
            id="login-button" 
            onClick ={this.submit}>Login</button>
            
          </div>
        </form>
      </div>
    );
  }
}


export default App;
