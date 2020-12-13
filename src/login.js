import React from "react"
import Auth from "./loginComponents/auth";
import "./loginComponents/comp.css"
import bootstrap from "bootstrap"
import { Alert } from 'react-bootstrap';



class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      status: "",
      setStatus: props.setLoginStatus,
      role:"",
      message:""
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

  receiveLoginResponse(newStatus,email, role, firstname,mess) {
    this.setState({ status: newStatus })
    this.setState({role:role})
    this.setState({message:mess})
    this.state.setStatus(newStatus,email,role, firstname)
    console.log(this.state.status)
    console.log(this.state.role)
  }

  render() {
    var colour = "danger"
    if(this.state.message !== ""){
      
      return (
        <div id="area">
        <Alert variant={colour}>
                    <p>{this.state.message}</p>
        </Alert>
        <h1 className="display-1">Login Page</h1>
        <div id="inputarea">
          <form role="form" className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="h3">Email:</label>
              <input name="email"
                type="email"
                placeholder="Email"
                className="form-control mx-auto"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                required></input>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="h3">Password:</label>
              <input name="password"
                type="password"
                placeholder="Password"
                className="form-control mx-auto"
                id="password"
                value={this.state.password}
                onChange={this.handleChange2}
                required></input>
            </div>
          <button className="btn btn-primary btn-block mx-auto my-5" type="submit"
                id="login-button"
                
                onClick={this.submit}>Login</button>
          </form>

        </div>
      </div>
    );
  }else{
    return (
      <div id="area">
      <h1 className="display-1">Login Page</h1>
      <div id="inputarea">
        <form role="form" className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="h3">Email:</label>
            <input name="email"
              type="email"
              placeholder="Email"
              className="form-control mx-auto"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              required></input>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="h3">Password:</label>
            <input name="password"
              type="password"
              placeholder="Password"
              className="form-control mx-auto"
              id="password"
              value={this.state.password}
              onChange={this.handleChange2}
              required></input>
          </div>
        <button className="btn btn-primary btn-block mx-auto my-5" type="submit"
              id="login-button"
              
              onClick={this.submit}>Login</button>
        </form>

      </div>
    </div>
    )
  }
  }
}


export default Login;
