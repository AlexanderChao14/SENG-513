function AuthSignup(email, pass, firstname, lastname, passverify, callback, callback2){
    var status
    var message
    console.log(email)
    console.log(pass)
    console.log(firstname)
    console.log(lastname)
    console.log(passverify)
    if(email ==null || email ===""){
        console.log("Please enter email")
        message ="Please enter email"
        callback2(message)
    } else if(pass == null || pass === ''){
        console.log("Please enter pass");
        message ="Please enter password"
        callback2(message)
    }
    else if(firstname == null || firstname === ''){
        message="Please enter first name"
        callback2(message)
    }
    else if(lastname == null || lastname === ''){
        console.log("Plese enter last name");
        message="Please enter last name"
        callback2(message)
    }
    else if(pass !== passverify){
        console.log("Plese enter the same password");
        message="Please verify password"
        callback2(message )
    }
    else{
        console.log("setting up")
        var input = {
            firstName:firstname,
            lastName:lastname,
            email: email,
            password: pass,
          };
        console.log("input: ", input);
        fetch("http://battleship.us-east-1.elasticbeanstalk.com/signup", {
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            })
            .then(response => response.json())
            .then((res) => {
                console.log("Response", res);
                // console.log("#################",res.body.login)
                console.log("Sending")
                if(res?.statusCode ===200){
                    status = res.body.created
                    console.log(res)
                    console.log("works")
                    console.log(status)
                    callback(status, res.body.message)
                    return status
                }
                else{
                    status = res.body.created
                    console.log(res?.body?.message)
                    callback(status, res.body.message)
                    return status

                }
                //addNotification(res?.body?.message);
                //else addNotification(res?.body?.message);;
            })
            .catch((err) => {
                console.log("###error: ",err);
                //addNotification("###error: ",err);
            });
    }
}

export default AuthSignup;