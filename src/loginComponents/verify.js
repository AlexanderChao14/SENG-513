import React from "react"
import AuthVerify from "./authverify"
import {Link} from "react-router-dom"
import {  Alert } from 'react-bootstrap';
import "./othercomp.css"

class Verify extends React.Component{
    constructor(props){
        super();
        this.state={
            message:""
        }
        this.waiting = this.waiting.bind(this)
        this.getMessage = this.getMessage.bind(this)
        this.getUrlParams = this.getUrlParams.bind(this)
    }

    getMessage(newMess){
        this.setState({message: newMess})
        console.log(newMess)
        console.log("$$$$", this.state.message)
    }

    waiting(){
        console.log("About to start")
        var gotoVerify = AuthVerify(this.getMessage)
        console.log("Got it")
        console.log(gotoVerify)
    }


    getUrlParams() {
        var p = {};
        var match,
          pl     = /\+/g,
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);
        while (match = search.exec(query))
          p[decode(match[1])] = decode(match[2]);
        return p;
      }

    componentDidMount() {
        console.log("running")
        var urlParams = this.getUrlParams();
          if (!('email' in urlParams) || !('verify' in urlParams)) {
            console.log('Please specify email and verify token in the URL.');
            // this.getMessage("Please specify email and verify token in the URL.")
            this.setState({message: 'Please specify email and verify token in the URL.'})
          } else {
            console.log('Verifying...');
            var input = {
              email: urlParams['email'],
              verify: urlParams['verify']
            };
        
            console.log("input: ", input);
            fetch("http://battleship.us-east-1.elasticbeanstalk.com/verifyemail", {
                body: JSON.stringify(input),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                })
                .then(response => response.json())
                .then((res) => {
                    console.log("Response", res);
                   
                   
                    if(res?.statusCode ===200){
        
                      console.log(res?.body?.message);
                      
                    //   this.getMessage(res.body.message)
                      this.setState({message: res.body.message})
                    }
                    else{
                      console.log(res?.body?.message);;
                    //   this.getMessage(res.body.message)
                      this.setState({message: res.body.message})
                    } 
                })
                .catch((err) => {
                    console.log("###error: ",err);
                });
          }
    
    }

    render(){
        var colour = "danger";
        if(this.state.message !== ""){
            if(this.state.message ==="You has been Verified, thanks!"){
                colour ="success"
            }
            return(
                <div>
                    <h1>Verify</h1>
                    {console.log(this.state.message)} 
                    <Alert variant={colour}>
                        <p> {this.state.message}</p>
                    </Alert>
                    
                    <div id="link">
                    <Link to="/">To Login</Link>

                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Verify</h1>
                   
                    <h2>Loading...</h2>
                    <div id="link">
                    <Link to="/">To Login</Link>
    
                    </div>
                </div>
            )
        }
    }
}

export default Verify