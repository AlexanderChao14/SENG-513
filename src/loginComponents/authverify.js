import React from "react"

function getUrlParams() {
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

function AuthVerify(){
    console.log("running")
var urlParams = getUrlParams();
  if (!('email' in urlParams) || !('verify' in urlParams)) {
    console.log('Please specify email and verify token in the URL.');
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
           
           
            if(res?.statusCode ===200) console.log(res?.body?.message);
            else{
              console.log(res?.body?.message);;
              
            } 
            var isVerified = res.body.message
            return isVerified
        })
        .catch((err) => {
            console.log("###error: ",err);
        });
  }
}



export default AuthVerify