function getUrlParams() {
    var p = {};
    var match,
      pl     = /\+/g,
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s)
        { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1);
    while (match = search.exec(query))
      p[decode(match[1])] = decode(match[2]);
    return p;
  }




function resetPassword(pass, verify, callback) {
    
    var urlParams = getUrlParams();
    var email = urlParams['email'] || null;
    var lost = urlParams['lost'] || null;
    if (pass === null || pass === '') {
       console.log('Please specify a password.');
       callback('Please specify a password.')
    } else if (pass !== verify) {
        console.log('Passwords are <not the same, please check.');
        callback('Passwords are not the same, please check.')
    } else {
        if ((!email)||(!lost)) {
        console.log('Please specify email and lost token in the URL.');
        callback('Please specify email and lost token in the URL.')
        } else {
        console.log('Trying to reset password for user ' +
            email + ' ...');
        var input = {
            email: email,
            lost: lost,
            password: pass
        };
        console.log("input: ", input);
        fetch("http://battleship.us-east-1.elasticbeanstalk.com/resetpassword", {
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
                    callback(res.body.message)
                }else{
                    console.log(res?.body?.message);;
                    callback(res.body.message)
                } 
                
            })
            .catch((err) => {
                console.log("###error: ",err);
                console.log("###error: ",err);
            });
        }
    }
}

export default resetPassword