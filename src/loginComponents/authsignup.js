function AuthSignup(email, pass, firstname, lastname, passverify, callback){
    var status
    if(email ==null || email.value ==''){
        console.log("Please enter email")
    } else if(pass == null || pass === ''){
        console.log("Please enter pass");
    }
    else if(firstname == null || firstname === ''){
        console.log("Plese enter first name");
    }
    else if(lastname == null || lastname === ''){
        console.log("Plese enter last name");
    }
    else if(pass != passverify){
        console.log("Plese enter the same password");
    }
    else{
        var input ={
            firstname:firstname,
            lastname:lastname,
            email:email,
            password: pass
        }   
        console.log("input: ", input);
        fetch("https://d0obxrkfta.execute-api.us-east-1.amazonaws.com/dev/signup", {
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
        
                if(res?.statusCode ===200){
                    status = res.body.created
                    console.log(res)
                    console.log("works")
                    console.log(status)
                    callback(status, email)
                }
                else{
                    status = res.body.created
                    console.log(res?.body?.message)

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