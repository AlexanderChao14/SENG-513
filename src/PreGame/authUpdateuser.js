function AuthUpdate(first,last, callback){
    if(first == null || first === ''){
        console.log("Please use enter a first name");
         callback( "Please use enter a first name")
        
    } else if(last == null || last === ''){
        console.log("plese eneter in real last name");
        callback("Please use enter a last name")
        
    }
    else{
        let input = {                        
            email: sessionStorage.getItem("Email"),
            firstName: first,
            lastName: last
          }; 
          
                  fetch("http://battleship.us-east-1.elasticbeanstalk.com/updateuserInfo", {
                  body: JSON.stringify(input),
                  headers: {
                      "Content-Type": "application/json"
                  },
                  method: "PATCH",
                  })
                  .then(response => response.json())
                  .then((res) => {
                      console.log("Response", res);
                      // console.log("#################",res.body.login)
                      if(res?.statusCode ===200){
                          let firstName = res.body.firstName;
                          let lasttNameplace =res.body.lastName;
                          console.log(res?.body?.message);
                        
                          callback(res.body.message)
                          
                      } 
                      else{

                            callback(res.body.message)
                      } 
                  })
                  .catch((err) => {
                      console.log("###error: ",err);
                  });
    }
}



export default AuthUpdate;
