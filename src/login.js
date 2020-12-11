import './App.css';
import React from "react"
import Auth from "./loginComponents/auth";
import "./loginComponents/comp.css"



class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      status: "",
      setStatus: props.setLoginStatus,
      role:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.submit = this.submit.bind(this);
    this.receiveLoginResponse=this.receiveLoginResponse.bind(this)
  }


  handleChange(values) {
    this.setState({ email: values.target.value })
  }
  handleChange2(values) {
    this.setState({ password: values.target.value })
  }

  submit(e) {
    // if(this.state.email ==null || this.state.email ==''){
    //   console.log("please enter email")
    // }else if (this.state.password == null || this.state.password ==''){
    //   console.log("enter password")
    // }else{
    var newStatus = Auth(this.state.email, this.state.password,this.receiveLoginResponse)
    console.log(newStatus)
    e.preventDefault();
    // }
  }

  receiveLoginResponse(newStatus,email, role, firstname) {
    this.setState({ status: newStatus })
    this.setState({role:role})
    this.state.setStatus(newStatus,email,role, firstname)
    console.log(this.state.status)
    console.log(this.state.role)
  }

  render() {
    return (
      <div id="area">
        <h1>Login Page</h1>
        <div id="inputarea">
          <form role="form" id="login-form">
            <div className="input">
              <label htmlFor="email">Email:</label>
              <input name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                required></input>
            </div>
            <div className="input">
              <label htmlFor="password">Password:</label>
              <input name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={this.handleChange2}
                required></input>
            </div>
          <button className="enter" type="submit"
                id="login-button"
                onClick={this.submit}>Login</button>
          </form>

        </div>
      </div>
    );
  }
}


export default Login;
