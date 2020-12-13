function Auth(email, pass, callback){
    var status
    var userRole
    var first
    var message
    if(email == null || email === ''){
        console.log("Please use enter a email");
        message="Please use enter a email"
        callback(status,email, userRole, first,message)
    } else if(pass == null || pass === ''){
        console.log("plese eneter in real password");
        message="plese eneter in real password"
        callback(status,email, userRole, first,message)
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
                message = res.body.message
                userRole = res.body.role
                callback(status,email, userRole, first,message)
                return status
                
            }
            else {
                status = res.body.login
                first=res.body.firstName
                userRole = res.body.role
                message = res.body.message
                console.log(res?.body?.message);
                callback(status,email, userRole,first,message)
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