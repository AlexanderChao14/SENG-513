function AuthLostPassword(email,callback, callback2) {
    var status
    
    console.log('Password Lost...');
    if (email === null || email === '') {
        console.log('Please specify your email address.');
        callback2("Please specify your email address.")
    } else {
      var input = {
        email: email
      };
     
      console.log("input: ", input);
      fetch("http://battleship.us-east-1.elasticbeanstalk.com/lostpassword", {
          body: JSON.stringify(input),
          headers: {
              "Content-Type": "application/json"
          },
          method: "POST",
          })
          .then(response => response.json())
          .then((res) => {
              console.log("Response", res);
              console.log("#################",res.body)
             
              if(res?.statusCode ===200){
                console.log(res?.body?.message);
                status = res.body.sent
                callback(status, res.body.message)
                return status
              } 
              else{
                console.log(res?.body?.message);
                status = res.body.sent
                callback(status, res.body.message)
                return status
              } 
              
          })
          .catch((err) => {
              console.log("###error: ",err);
          });
    }
  }
  export default AuthLostPassword