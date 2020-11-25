


function Auth(email, pass){
    if(email == null || email == ''){
        console.log("Please use enter a email");
    } else if(pass == null || pass == ''){
        console.log("plese eneter in real password");
    }else{
        var input = {
            email: email,
            password: pass
        };
        console.log("input: ", input);

        fetch("https://d0obxrkfta.execute-api.us-east-1.amazonaws.com/dev/login", {
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        })
        .then(response => response.json())
        .then((res) => {
            console.log("Response", res);
            console.log("#################",res.body.login)
        
            
            if(res?.statusCode ===200) {
              console.log(res);
              console.log("you have been log in successfully");
              
            }
            else {
                console.log(res?.body?.message);
            }
        })
        .catch((err) => {
            console.log("###error: ",err);
            //addNotification("###error: ",err);
        });
    }
}


export default Auth;