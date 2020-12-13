function AuthUpdatepass(old,newpass , verify, callback){
    if(old == null || old === ''){
        console.log("Please use enter a old password");
         callback( "Please use enter a old password")
        
    } else if(newpass == null || newpass === ''){
        console.log("plese eneter new password");
        callback("plese enter new password")
        
    }
    else if(verify !== newpass){
        callback("Please enter same new password")
    }
    else{
        let input = {                        
            email: sessionStorage.getItem("Email"),
            oldPassWord: old,
            newPassword: newpass
          }; 
                  fetch("http://battleship.us-east-1.elasticbeanstalk.com/updatepassword", {
                  body: JSON.stringify(input),
                  headers: {
                      "Content-Type": "application/json"
                  },
                  method: "PATCH",
                  })
                  .then(response => response.json())
                  .then((res) => {
                      console.log("Response", res);
                      if(res?.statusCode ===200){
                          console.log(res?.body?.message);
                      } 
                      else {
                          console.log(res?.body?.message)
                      };
                  })
                  .catch((err) => {
                      console.log("###error: ",err);
                  });
    }
}



export default AuthUpdatepass;
