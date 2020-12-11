function Auth(email, pass, callback){
    var status
    var userRole
    var first
    if(email == null || email === ''){
        console.log("Please use enter a email");
    } else if(pass == null || pass === ''){
        console.log("plese eneter in real password");
    }else{
        var input = {
            email: email,
            password: pass
        };
        console.log("input: ", input);

        fetch("http://battleship.us-east-1.elasticbeanstalk.com/login", {
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
                status = res.body.login
                first=res.body.firstName
                console.log(res);
                console.log("you have been log in successfully");
                console.log(status)
                console.log(email)
                userRole = res.body.role
                callback(status,email, userRole, first)
                return status
                
            }
            else {
                status = res.body.login
                first=res.body.firstName
                userRole = res.body.role
                console.log(res?.body?.message);
                callback(status,email, userRole,first)
                return status
            }
        })
        .catch((err) => {
            console.log("###error: ",err);
            //addNotification("###error: ",err);
        });
    }
}


export default Auth;